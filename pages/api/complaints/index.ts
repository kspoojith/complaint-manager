import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/database';
import Complaint from '../../../models/Complaint';
import { authenticateToken, requireAdmin, AuthRequest } from '../../../lib/auth';
import { sendNewComplaintEmail } from '../../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getComplaints(req as AuthRequest, res);
    case 'POST':
      return createComplaint(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// GET /api/complaints - Get all complaints (admin only)
async function getComplaints(req: AuthRequest, res: NextApiResponse) {
  try {
    // Authenticate and check admin role
    authenticateToken(req, res, () => {
      requireAdmin(req, res, async () => {
        try {
          const { status, priority, page = 1, limit = 10 } = req.query;

          // Build filter object
          const filter: any = {};
          if (status && status !== 'all') filter.status = status;
          if (priority && priority !== 'all') filter.priority = priority;

          // Calculate pagination
          const skip = (Number(page) - 1) * Number(limit);

          // Get complaints with pagination and sorting
          const complaints = await Complaint.find(filter)
            .sort({ dateSubmitted: -1 })
            .skip(skip)
            .limit(Number(limit))
            .lean();

          // Get total count for pagination
          const total = await Complaint.countDocuments(filter);

          res.status(200).json({
            complaints,
            pagination: {
              current: Number(page),
              total: Math.ceil(total / Number(limit)),
              hasNext: skip + complaints.length < total,
              hasPrev: Number(page) > 1,
            },
          });
        } catch (error) {
          console.error('Error fetching complaints:', error);
          res.status(500).json({ error: 'Failed to fetch complaints' });
        }
      });
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

// POST /api/complaints - Create new complaint
async function createComplaint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, category, priority, userEmail } = req.body;

    // Validate required fields
    if (!title || !description || !category || !priority) {
      return res.status(400).json({
        error: 'Please provide title, description, category, and priority',
      });
    }

    // Validate category and priority values
    const validCategories = ['Product', 'Service', 'Support'];
    const validPriorities = ['Low', 'Medium', 'High'];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }

    // Create new complaint
    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      userEmail,
      status: 'Pending',
      dateSubmitted: new Date(),
    });

    await complaint.save();

    // Send email notification to admin
    try {
      const adminEmail = process.env.EMAIL_USER;
      if (adminEmail) {
        console.log('📧 Attempting to send email notification to admin:', adminEmail);
        await sendNewComplaintEmail(complaint, adminEmail);
        console.log('✅ Email notification sent successfully');
      } else {
        console.warn('⚠️ EMAIL_USER not configured - skipping email notification');
      }
    } catch (emailError) {
      console.error('❌ Failed to send email notification:', emailError);
      // Don't fail the request if email fails, but log the error
      // The complaint is still saved successfully
    }

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint: {
        id: complaint._id,
        title: complaint.title,
        category: complaint.category,
        priority: complaint.priority,
        status: complaint.status,
        dateSubmitted: complaint.dateSubmitted,
      },
    });
  } catch (error: any) {
    console.error('Error creating complaint:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }

    res.status(500).json({ error: 'Failed to submit complaint' });
  }
}