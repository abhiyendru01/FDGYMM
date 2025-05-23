
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Calendar, Check } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

type AttendanceRecord = {
  id: string;
  user_id: string;
  user_name: string;
  user_image?: string;
  check_in_time: string;
  status: 'checked_in' | 'checked_out';
};

const AdminAttendance = () => {
  const navigate = useNavigate();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check admin authentication
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    } else {
      loadAttendanceData();
    }
  }, [navigate]);

  const loadAttendanceData = () => {
    try {
      // This would normally fetch from API - using mock data for now
      const today = new Date();
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Generate mock attendance records for today based on real users
      const mockAttendance: AttendanceRecord[] = [];
      
      if (users.length > 0) {
        // Use actual users for attendance records
        const usersForAttendance = users.slice(0, Math.min(users.length, 10));
        
        usersForAttendance.forEach((user: any, index: number) => {
          // Create a check-in time between 7am and 10am
          const hours = 7 + Math.floor(Math.random() * 3);
          const minutes = Math.floor(Math.random() * 60);
          const checkInTime = new Date(today);
          checkInTime.setHours(hours, minutes, 0, 0);
          
          mockAttendance.push({
            id: `attendance_${Date.now()}_${index}`,
            user_id: user.id,
            user_name: `${user.first_name} ${user.last_name}`,
            user_image: user.image_url,
            check_in_time: checkInTime.toISOString(),
            status: 'checked_in'
          });
        });
      } else {
        // Use mock data if no users
        const mockNames = [
          "John Smith", "Emma Johnson", "Michael Williams", 
          "Olivia Brown", "William Jones", "Ava Davis", 
          "James Miller", "Sophia Wilson", "Alexander Moore"
        ];
        
        mockNames.forEach((name, index) => {
          // Create a check-in time between 7am and 10am
          const hours = 7 + Math.floor(Math.random() * 3);
          const minutes = Math.floor(Math.random() * 60);
          const checkInTime = new Date(today);
          checkInTime.setHours(hours, minutes, 0, 0);
          
          mockAttendance.push({
            id: `attendance_${Date.now()}_${index}`,
            user_id: `mock_user_${index}`,
            user_name: name,
            check_in_time: checkInTime.toISOString(),
            status: 'checked_in'
          });
        });
      }
      
      // Sort by check-in time, newest first
      mockAttendance.sort((a, b) => 
        new Date(b.check_in_time).getTime() - new Date(a.check_in_time).getTime()
      );
      
      // Store in localStorage for persistence
      localStorage.setItem('attendance_records', JSON.stringify(mockAttendance));
      
      setAttendanceRecords(mockAttendance);
    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-orbitron font-bold mb-6">Attendance</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="glassmorphism border-fdgym-dark-gray p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 text-green-500 rounded-full mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendanceRecords.length}</p>
                  <p className="text-sm text-fdgym-light-gray">Members checked in today</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism border-fdgym-dark-gray p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{
                    // Calculate average check-ins based on mock data
                    Math.floor(attendanceRecords.length * 0.8)
                  }</p>
                  <p className="text-sm text-fdgym-light-gray">Avg. daily check-ins</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism border-fdgym-dark-gray p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{
                    JSON.parse(localStorage.getItem('users') || '[]').length
                  }</p>
                  <p className="text-sm text-fdgym-light-gray">Total members</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Today's Check-ins</h2>
              <p className="text-fdgym-light-gray">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
                <span className="ml-2 text-fdgym-light-gray">Loading attendance data...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-fdgym-dark-gray">
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Member</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Time</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-fdgym-light-gray">
                          No check-ins recorded today
                        </td>
                      </tr>
                    ) : (
                      attendanceRecords.map((record) => (
                        <tr key={record.id} className="border-b border-fdgym-dark-gray/50 hover:bg-fdgym-dark-gray/20">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={record.user_image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"} 
                                  alt={record.user_name} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <span>{record.user_name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-fdgym-light-gray">
                            {format(new Date(record.check_in_time), 'h:mm a')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                                <Check className="inline-block h-3 w-3 mr-1" />
                                {record.status === 'checked_in' ? 'Checked in' : 'Checked out'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <Button
              onClick={() => {}}
              variant="outline"
              className="mt-6 border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
            >
              View All Check-ins
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
