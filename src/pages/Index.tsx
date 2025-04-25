
import React from 'react';
import Navbar from '@/components/Navbar';
import { PatentFormProvider } from '@/context/PatentFormContext';
import PatentForm from '@/components/PatentForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-patent-700">Patent Application Form</h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Complete the following steps to submit your patent application. You can save your progress and return later.
            </p>
          </div>
          
          <PatentFormProvider>
            <PatentForm />
          </PatentFormProvider>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PatentEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
