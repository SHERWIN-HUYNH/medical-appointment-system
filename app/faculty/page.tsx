
'use client';
import React, { useState, useEffect } from 'react';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { Button } from '@/components/ui/button';

interface Faculty {
  id: string;
  name: string;
  description?: string;
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty');
        const data = await response.json();
        setFaculties(data || []);
      } catch (error) {
        console.log(error);
        setFaculties([]);
      }
    };
    fetchFaculties();
  }, []);

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

const page = () => {
  return (
    <div>
      <FacultyPage />
    </div>
  );
};

export default page;
