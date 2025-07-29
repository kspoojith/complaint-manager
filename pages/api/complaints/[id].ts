import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/database';
import Complaint from '../../../models/Complaint';
import { authenticateToken, requireAdmin, AuthRequest } from '../../../lib/auth';
import { sendStatusUpdateEmail, sendComplaintResolvedEmail } from '../../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Complaint ID is required' });
  }

  switch (req.method) {
    case 'GET':
      return getComplaint(req as AuthRequest, res, id);
    case 'PUT':
      return updateComplaint(req as AuthRequest, res, id);
    case 'DELETE':
      return deleteComplaint(req as AuthRequest, res, id);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// GET /api/complaints/[id] - Get specific complaint (admin only)
async function getComplaint(req: AuthRequest, res: NextApiResponse, id: string) {
  try {
    authenticateToken(req, res, () => {
      requireAdmin(req, res, async () => {
        try {
          const complaint = await Complaint.findById(id).lean();
          
          if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
          }

          res.status(200).json({ complaint });
        } catch (error) {
          console.error('Error fetching complaint:', error);
          res.status(500).json({ error: 'Failed to fetch complaint' });
        }
      });
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

// PUT /api/complaints/[id] - Update complaint (admin only)
async function updateComplaint(req: AuthRequest, res: NextApiResponse, id: string) {
  try {
    authenticateToken(req, res, () => {
      requireAdmin(req, res, async () => {
        try {
          const { status, adminNotes } = req.body;

          // Find the complaint first to get the old status
          const existingComplaint = await Complaint.findById(id);
          if (!existingComplaint) {
            return res.status(404).json({ error: 'Complaint not found' });
          }

          const oldStatus = existingComplaint.status;

          // Prepare update object
          const updateData: any = {};
          if (status) {
            updateData.status = status;
            // Set resolved date if status is changed to resolved
            if (status === 'Resolved' && oldStatus !== 'Resolved') {
              updateData.resolvedDate = new Date();
            }
          }
          if (adminNotes !== undefined) {
            updateData.adminNotes = adminNotes;
          }

          // Update the complaint
          const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
          );

          if (!updatedComplaint) {
            return res.status(404).json({ error: 'Complaint not found' });
          }

          // Send email notifications
          try {
            const adminEmail = process.env.EMAIL_USER;
            if (adminEmail) {
              console.log('📧 Attempting to send status update emails to admin:', adminEmail);
              
              // Send status update email
              if (status && status !== oldStatus) {
                console.log('📧 Sending status update email (status changed from', oldStatus, 'to', status, ')');
                await sendStatusUpdateEmail(updatedComplaint, oldStatus, adminEmail);
              }

              // Send resolved email if status changed to resolved
              if (status === 'Resolved' && oldStatus !== 'Resolved') {
                console.log('📧 Sending complaint resolved email');
                await sendComplaintResolvedEmail(updatedComplaint, adminEmail);
              }
              
              console.log('✅ Status update emails sent successfully');
            } else {
              console.warn('⚠️ EMAIL_USER not configured - skipping email notifications');
            }
          } catch (emailError) {
            console.error('❌ Failed to send email notification:', emailError);
            // Don't fail the request if email fails, but log the error
            // The complaint update is still successful
          }

          res.status(200).json({
            message: 'Complaint updated successfully',
            complaint: updatedComplaint,
          });
        } catch (error: any) {
          console.error('Error updating complaint:', error);
          
          if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err: any) => err.message);
            return res.status(400).json({ error: errors.join(', ') });
          }

          res.status(500).json({ error: 'Failed to update complaint' });
        }
      });
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

// DELETE /api/complaints/[id] - Delete complaint (admin only)
async function deleteComplaint(req: AuthRequest, res: NextApiResponse, id: string) {
  try {
    authenticateToken(req, res, () => {
      requireAdmin(req, res, async () => {
        try {
          const complaint = await Complaint.findByIdAndDelete(id);
          
          if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
          }

          res.status(200).json({
            message: 'Complaint deleted successfully',
            complaint: {
              id: complaint._id,
              title: complaint.title,
            },
          });
        } catch (error) {
          console.error('Error deleting complaint:', error);
          res.status(500).json({ error: 'Failed to delete complaint' });
        }
      });
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}