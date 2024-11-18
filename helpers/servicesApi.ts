export const fetchServices = async (facultyId: string) => {
    try {
      const response = await fetch(`/api/service/${facultyId}`);
      if (!response.ok) throw new Error('Error fetching services');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  };