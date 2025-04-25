import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Inventor } from '@/components/InventorFields';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Define the form data types
interface ApplicantInfo {
  applicantType: string;
  companyName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface InventionInfo {
  title: string;
  category: string;
  abstract: string;
  description: string;
  problemSolved: string;
  useCase: string;
}

interface FilingInfo {
  filingDate: Date | null;
  priorityDate: Date | null;
  countryOfFiling: string;
  drawings: File | null;
  specification: File | null;
  additionalDocuments: File[];
  acknowledgments: {
    truthfulness: boolean;
    ownership: boolean;
    priorArt: boolean;
  };
}

interface PatentFormData {
  applicantInfo: ApplicantInfo;
  inventors: Inventor[];
  inventionInfo: InventionInfo;
  filingInfo: FilingInfo;
}

// Default values
const defaultFormData: PatentFormData = {
  applicantInfo: {
    applicantType: 'individual',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  },
  inventors: [
    {
      id: uuidv4(),
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    },
  ],
  inventionInfo: {
    title: '',
    category: '',
    abstract: '',
    description: '',
    problemSolved: '',
    useCase: '',
  },
  filingInfo: {
    filingDate: null,
    priorityDate: null,
    countryOfFiling: 'United States',
    drawings: null,
    specification: null,
    additionalDocuments: [],
    acknowledgments: {
      truthfulness: false,
      ownership: false,
      priorArt: false,
    },
  },
};

// Context type
interface PatentFormContextType {
  formData: PatentFormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateApplicantInfo: (data: Partial<ApplicantInfo>) => void;
  addInventor: () => void;
  removeInventor: (id: string) => void;
  updateInventor: (id: string, field: keyof Inventor, value: string) => void;
  updateInventionInfo: (data: Partial<InventionInfo>) => void;
  updateFilingInfo: (data: Partial<FilingInfo>) => void;
  updateAcknowledgments: (key: keyof FilingInfo['acknowledgments'], value: boolean) => void;
  saveFormData: () => void;
  resetForm: () => void;
  submitForm: () => void;
}

// Create context
const PatentFormContext = createContext<PatentFormContextType | undefined>(undefined);

// Provider component
export const PatentFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to load form data from localStorage
  const loadFormData = (): PatentFormData => {
    if (typeof window === 'undefined') return defaultFormData;
    
    const savedData = localStorage.getItem('patent-form-data');
    if (!savedData) return defaultFormData;
    
    try {
      const parsedData = JSON.parse(savedData);
      
      // Convert date strings back to Date objects
      if (parsedData.filingInfo.filingDate) {
        parsedData.filingInfo.filingDate = new Date(parsedData.filingInfo.filingDate);
      }
      if (parsedData.filingInfo.priorityDate) {
        parsedData.filingInfo.priorityDate = new Date(parsedData.filingInfo.priorityDate);
      }
      
      // Files can't be saved in localStorage, so we'll need to set them as null
      if (parsedData.filingInfo) {
        parsedData.filingInfo.drawings = null;
        parsedData.filingInfo.specification = null;
        parsedData.filingInfo.additionalDocuments = [];
      }
      
      return parsedData;
    } catch (error) {
      console.error('Error parsing saved form data:', error);
      return defaultFormData;
    }
  };

  const [formData, setFormData] = useState<PatentFormData>(loadFormData);
  const [currentStep, setCurrentStep] = useState(0);

  // Update functions
  const updateApplicantInfo = (data: Partial<ApplicantInfo>) => {
    setFormData((prev) => ({
      ...prev,
      applicantInfo: {
        ...prev.applicantInfo,
        ...data,
      },
    }));
  };

  const addInventor = () => {
    const newInventor: Inventor = {
      id: uuidv4(),
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    };

    setFormData((prev) => ({
      ...prev,
      inventors: [...prev.inventors, newInventor],
    }));
  };

  const removeInventor = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      inventors: prev.inventors.filter((inventor) => inventor.id !== id),
    }));
  };

  const updateInventor = (id: string, field: keyof Inventor, value: string) => {
    setFormData((prev) => ({
      ...prev,
      inventors: prev.inventors.map((inventor) =>
        inventor.id === id ? { ...inventor, [field]: value } : inventor
      ),
    }));
  };

  const updateInventionInfo = (data: Partial<InventionInfo>) => {
    setFormData((prev) => ({
      ...prev,
      inventionInfo: {
        ...prev.inventionInfo,
        ...data,
      },
    }));
  };

  const updateFilingInfo = (data: Partial<FilingInfo>) => {
    setFormData((prev) => ({
      ...prev,
      filingInfo: {
        ...prev.filingInfo,
        ...data,
      },
    }));
  };

  const updateAcknowledgments = (key: keyof FilingInfo['acknowledgments'], value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      filingInfo: {
        ...prev.filingInfo,
        acknowledgments: {
          ...prev.filingInfo.acknowledgments,
          [key]: value,
        },
      },
    }));
  };

  const saveFormData = () => {
    const dataToSave = { ...formData };
    // Files can't be stringified directly for localStorage
    localStorage.setItem('patent-form-data', JSON.stringify(dataToSave));
    toast.success('Form data saved successfully');
  };

  const resetForm = () => {
    localStorage.removeItem('patent-form-data');
    setFormData(defaultFormData);
    setCurrentStep(0);
    toast.info('Form data has been reset');
  };

  const submitForm = () => {
    // Here you would typically send the data to an API
    console.log('Submitting form data:', formData);
    
    // Simulating API call delay
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Submitting your application...',
        success: 'Patent application submitted successfully!',
        error: 'Failed to submit application. Please try again.',
      }
    );
    
    // For demonstration, let's reset the form after "submission"
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  const value = {
    formData,
    currentStep,
    setCurrentStep,
    updateApplicantInfo,
    addInventor,
    removeInventor,
    updateInventor,
    updateInventionInfo,
    updateFilingInfo,
    updateAcknowledgments,
    saveFormData,
    resetForm,
    submitForm,
  };

  return <PatentFormContext.Provider value={value}>{children}</PatentFormContext.Provider>;
};

// Custom hook to use the context
export const usePatentForm = () => {
  const context = useContext(PatentFormContext);
  if (context === undefined) {
    throw new Error('usePatentForm must be used within a PatentFormProvider');
  }
  return context;
};
