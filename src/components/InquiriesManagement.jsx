
import React, { useState, useEffect } from 'react';
import { Trash2, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';
import { format } from 'date-fns';

const InquiriesManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchInquiries = async () => {
    try {
      const records = await pb.collection('customized_inquiries').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setInquiries(records);
    } catch (error) {
      toast.error('Failed to load customized inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await pb.collection('customized_inquiries').delete(deleteConfirm.id, { $autoCancel: false });
      toast.success('Inquiry deleted successfully');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to delete inquiry');
    } finally {
      setDeleteConfirm(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-semibold">Customized Inquiries</h2>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-xl border border-border">
          <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg mb-2">No customized inquiries yet</p>
          <p className="text-sm text-muted-foreground">When users submit the customized journey form, they will appear here.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-x-auto bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Client Info</TableHead>
                <TableHead>Destinations</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="group">
                  <TableCell className="align-top">
                    <div className="font-medium text-foreground">{inquiry.full_name}</div>
                    <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                    <div className="text-sm text-muted-foreground">{inquiry.phone_number}</div>
                  </TableCell>
                  <TableCell className="align-top max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {inquiry.preferred_destinations.split(', ').map((dest, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-normal">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="text-sm"><span className="text-muted-foreground">Days:</span> {inquiry.number_of_days}</div>
                    <div className="text-sm"><span className="text-muted-foreground">Budget:</span> {inquiry.budget_range}</div>
                  </TableCell>
                  <TableCell className="align-top max-w-[250px]">
                    <p className="text-sm text-muted-foreground line-clamp-3" title={inquiry.special_requirements}>
                      {inquiry.special_requirements || "None provided"}
                    </p>
                  </TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(inquiry.created), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell className="align-top text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDeleteConfirm(inquiry)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the inquiry from "{deleteConfirm?.full_name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InquiriesManagement;
