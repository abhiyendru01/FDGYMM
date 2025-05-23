
import { useState, useEffect } from 'react';
import { Calendar, UserCheck, UserX, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Mock attendance data
const MOCK_ATTENDANCE = [
  {
    id: 1,
    user_id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    date: '2025-05-20',
    status: 'present',
    check_in_time: '10:30 AM',
  },
  {
    id: 2,
    user_id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    date: '2025-05-20',
    status: 'present',
    check_in_time: '09:15 AM',
  },
  {
    id: 3,
    user_id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    date: '2025-05-20',
    status: 'absent',
    check_in_time: null,
  },
  {
    id: 4,
    user_id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    date: '2025-05-19',
    status: 'present',
    check_in_time: '11:00 AM',
  },
  {
    id: 5,
    user_id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    date: '2025-05-19',
    status: 'present',
    check_in_time: '10:45 AM',
  },
];

const AttendanceSystem = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceData, setAttendanceData] = useState(MOCK_ATTENDANCE);
  const [filteredData, setFilteredData] = useState(MOCK_ATTENDANCE);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, you'd fetch from Supabase here
    // For now, we're using mock data
    filterData();
  }, [date, searchQuery]);
  
  const filterData = () => {
    let filtered = [...attendanceData];
    
    // Filter by date
    if (date) {
      filtered = filtered.filter(record => record.date === date);
    }
    
    // Filter by search query (name or email)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        record => 
          record.name.toLowerCase().includes(query) || 
          record.email.toLowerCase().includes(query)
      );
    }
    
    setFilteredData(filtered);
  };
  
  const toggleAttendance = (id, currentStatus) => {
    // In a real app, you'd update Supabase here
    const newStatus = currentStatus === 'present' ? 'absent' : 'present';
    const updatedData = attendanceData.map(record => 
      record.id === id 
        ? { 
            ...record, 
            status: newStatus,
            check_in_time: newStatus === 'present' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : null
          } 
        : record
    );
    
    setAttendanceData(updatedData);
    filterData();
    
    toast({
      title: "Attendance Updated",
      description: `Attendance marked as ${newStatus}`,
    });
  };
  
  const markAllPresent = () => {
    // Get all users shown in the current filtered view
    const userIds = [...new Set(filteredData.map(record => record.user_id))];
    
    // Update their attendance
    const updatedData = attendanceData.map(record => 
      userIds.includes(record.user_id) && record.date === date
        ? { 
            ...record, 
            status: 'present',
            check_in_time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          } 
        : record
    );
    
    setAttendanceData(updatedData);
    filterData();
    
    toast({
      title: "Batch Attendance Update",
      description: `Marked ${userIds.length} users as present`,
    });
  };
  
  return (
    <Card className="glassmorphism border-fdgym-dark-gray mb-6">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-orbitron">
              <div className="flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-fdgym-red" />
                Attendance System
              </div>
            </CardTitle>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray"
            />
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-fdgym-light-gray" />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray pl-10 pr-4"
              />
            </div>
            
            <Button 
              onClick={markAllPresent}
              className="bg-fdgym-red hover:bg-fdgym-neon-red text-white"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Mark All Present
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border border-fdgym-dark-gray overflow-hidden">
          <div className="bg-fdgym-dark-gray py-3 px-4 text-sm font-medium grid grid-cols-12 gap-4">
            <div className="col-span-4">Member</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-2">Check-in Time</div>
            <div className="col-span-3">Actions</div>
          </div>
          
          <div className="divide-y divide-fdgym-dark-gray">
            {filteredData.length > 0 ? (
              filteredData.map((record) => (
                <div key={record.id} className="py-3 px-4 text-sm grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <div className="font-medium">{record.name}</div>
                    <div className="text-fdgym-light-gray text-xs">{record.email}</div>
                  </div>
                  <div className="col-span-3">{record.date}</div>
                  <div className="col-span-2">
                    {record.check_in_time || '-'}
                  </div>
                  <div className="col-span-3">
                    <Button
                      onClick={() => toggleAttendance(record.id, record.status)}
                      className={`${
                        record.status === 'present' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-fdgym-dark-gray hover:bg-fdgym-red'
                      } text-white`}
                    >
                      {record.status === 'present' ? (
                        <><UserCheck className="mr-2 h-4 w-4" /> Present</>
                      ) : (
                        <><UserX className="mr-2 h-4 w-4" /> Absent</>
                      )}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-fdgym-light-gray">
                No attendance records found for this date or search query.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSystem;
