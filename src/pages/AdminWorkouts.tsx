
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Search, Filter, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Workout {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
}

const AdminWorkouts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    return JSON.parse(localStorage.getItem('workouts') || '[]');
  });
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'strength',
    difficulty: 'beginner',
    duration: 30,
  });

  // Check admin authentication
  const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  // Filter workouts based on search query
  const filteredWorkouts = workouts.filter(workout => {
    const query = searchQuery.toLowerCase();
    return workout.name.toLowerCase().includes(query) || 
           workout.description.toLowerCase().includes(query) ||
           workout.category.toLowerCase().includes(query);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddWorkout = () => {
    setFormData({
      name: '',
      description: '',
      category: 'strength',
      difficulty: 'beginner',
      duration: 30,
    });
    setIsAddModalOpen(true);
  };

  const handleEditWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
    setFormData({
      name: workout.name,
      description: workout.description,
      category: workout.category,
      difficulty: workout.difficulty,
      duration: workout.duration,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
    setIsDeleteModalOpen(true);
  };

  const saveWorkout = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // For new workout
        if (!currentWorkout) {
          const newWorkout = {
            id: `workout_${Math.random().toString(36).slice(2, 11)}`,
            ...formData
          };
          
          const updatedWorkouts = [...workouts, newWorkout];
          localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
          setWorkouts(updatedWorkouts);
          
          toast({
            title: "Success",
            description: "Workout added successfully",
          });
        } 
        // For editing existing workout
        else {
          const updatedWorkouts = workouts.map(w => {
            if (w.id === currentWorkout.id) {
              return { ...w, ...formData };
            }
            return w;
          });
          localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
          setWorkouts(updatedWorkouts);
          
          toast({
            title: "Success",
            description: "Workout updated successfully",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setCurrentWorkout(null);
      }
    }, 500);
  };

  const confirmDeleteWorkout = () => {
    if (!currentWorkout) return;
    
    setIsLoading(true);
    setTimeout(() => {
      try {
        const updatedWorkouts = workouts.filter(w => w.id !== currentWorkout.id);
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        setWorkouts(updatedWorkouts);
        
        toast({
          title: "Success",
          description: "Workout deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsDeleteModalOpen(false);
        setCurrentWorkout(null);
      }
    }, 500);
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-orbitron font-bold">Workouts</h1>
            <Button 
              className="bg-fdgym-red hover:bg-fdgym-neon-red"
              onClick={handleAddWorkout}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Workout
            </Button>
          </div>

          <div className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-fdgym-light-gray" />
                <Input 
                  placeholder="Search workouts..." 
                  className="pl-8 bg-fdgym-dark-gray border-fdgym-dark-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-fdgym-dark-gray flex gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>

            <div className="overflow-x-auto">
              {filteredWorkouts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-bold mb-2">No Workouts Found</h2>
                  <p className="text-fdgym-light-gray mb-6">
                    {searchQuery ? "Try a different search term." : "Add your first workout to get started."}
                  </p>
                  <Button
                    onClick={handleAddWorkout}
                    className="bg-fdgym-red hover:bg-fdgym-neon-red"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Workout
                  </Button>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-fdgym-dark-gray">
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Difficulty</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Duration</th>
                      <th className="text-right py-3 px-4 font-medium text-fdgym-light-gray">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkouts.map((workout) => (
                      <tr key={workout.id} className="border-b border-fdgym-dark-gray/50 hover:bg-fdgym-dark-gray/20">
                        <td className="py-3 px-4">{workout.name}</td>
                        <td className="py-3 px-4 text-fdgym-light-gray capitalize">{workout.category}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            workout.difficulty === 'beginner' 
                              ? 'bg-green-500/20 text-green-500' 
                              : workout.difficulty === 'intermediate'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-red-500/20 text-red-500'
                          }`}>
                            {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-fdgym-light-gray">{workout.duration} min</td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditWorkout(workout)}
                            className="text-fdgym-light-gray hover:text-fdgym-red hover:bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteWorkout(workout)}
                            className="text-fdgym-light-gray hover:text-fdgym-red hover:bg-transparent"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Workout Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-black border-fdgym-dark-gray">
          <DialogHeader>
            <DialogTitle>Add New Workout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Workout Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                className="bg-fdgym-dark-gray border-fdgym-dark-gray mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                className="bg-fdgym-dark-gray border-fdgym-dark-gray mt-1" 
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-fdgym-dark-gray border border-fdgym-dark-gray rounded-md text-white"
                >
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <select 
                  id="difficulty" 
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-fdgym-dark-gray border border-fdgym-dark-gray rounded-md text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (mins)</Label>
                <Input 
                  id="duration" 
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="bg-fdgym-dark-gray border-fdgym-dark-gray mt-1" 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
              className="border-fdgym-dark-gray"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveWorkout}
              className="bg-fdgym-red hover:bg-fdgym-neon-red"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Workout"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Workout Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-black border-fdgym-dark-gray">
          <DialogHeader>
            <DialogTitle>Edit Workout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Workout Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                className="bg-fdgym-dark-gray border-fdgym-dark-gray mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                className="bg-fdgym-dark-gray border-fdgym-dark-gray mt-1" 
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <select 
                  id="edit-category" 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-fdgym-dark-gray border border-fdgym-dark-gray rounded-md text-white"
                >
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-difficulty">Difficulty</Label>
                <select 
                  id="edit-difficulty" 
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-fdgym-dark-gray border border-fdgym-dark-gray rounded-md text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration (mins)</Label>
                <Input 
                  id="edit-duration" 
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="bg-fdgym-dark-gray border-fdgym-dark-gray mt-1" 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
              className="border-fdgym-dark-gray"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveWorkout}
              className="bg-fdgym-red hover:bg-fdgym-neon-red"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Workout"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-black border-fdgym-dark-gray">
          <DialogHeader>
            <DialogTitle>Delete Workout</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-fdgym-light-gray">
              Are you sure you want to delete <span className="font-bold text-white">{currentWorkout?.name}</span>? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-fdgym-dark-gray"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteWorkout}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Workout"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWorkouts;
