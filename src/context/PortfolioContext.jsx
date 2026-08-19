import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProfile, initialProjects, initialServices, initialSkills, initialTestimonials } from '../data/initialData';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('boutaba_theme') || 'dark';
  });

  // Profile state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('boutaba_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  // Projects state
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('boutaba_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // Services state
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('boutaba_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  // Skills state
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('boutaba_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('boutaba_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Admin authentication state
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('boutaba_admin_pin') || '1234';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('boutaba_admin_auth') === 'true';
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminViewActive, setIsAdminViewActive] = useState(false);

  // Selected project for detailed case study modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Synchronize theme with HTML document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('boutaba_theme', theme);
  }, [theme]);

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('boutaba_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('boutaba_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('boutaba_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('boutaba_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('boutaba_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Theme toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Admin auth methods
  const loginAdmin = (pin) => {
    if (pin === adminPin) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('boutaba_admin_auth', 'true');
      setIsAdminModalOpen(false);
      setIsAdminViewActive(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('boutaba_admin_auth');
    setIsAdminViewActive(false);
  };

  const updateAdminPin = (currentPin, newPin) => {
    if (currentPin === adminPin && newPin && newPin.length >= 4) {
      setAdminPin(newPin);
      localStorage.setItem('boutaba_admin_pin', newPin);
      return true;
    }
    return false;
  };

  // Project CRUD methods
  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: newProject.id || `proj-${Date.now()}`,
      status: newProject.status || 'published',
      featured: newProject.featured ?? false,
      year: newProject.year || new Date().getFullYear().toString(),
      images: newProject.images && newProject.images.length > 0 
        ? newProject.images 
        : (newProject.coverImage ? [{ url: newProject.coverImage, title: 'Aperçu' }] : [])
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updatedFields } : proj))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  const toggleProjectFeatured = (id) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, featured: !proj.featured } : proj))
    );
  };

  const moveProject = (id, direction) => {
    const index = projects.findIndex((p) => p.id === id);
    if (index < 0) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIndex, 0, moved);
    setProjects(newProjects);
  };

  // Export all portfolio data as JSON file
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      profile,
      projects,
      services,
      skills,
      testimonials
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_ahmed_boutaba_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import portfolio data from JSON
  const importData = (jsonData) => {
    try {
      if (jsonData.profile) setProfile(jsonData.profile);
      if (jsonData.projects && Array.isArray(jsonData.projects)) setProjects(jsonData.projects);
      if (jsonData.services && Array.isArray(jsonData.services)) setServices(jsonData.services);
      if (jsonData.skills && Array.isArray(jsonData.skills)) setSkills(jsonData.skills);
      if (jsonData.testimonials && Array.isArray(jsonData.testimonials)) setTestimonials(jsonData.testimonials);
      return true;
    } catch (err) {
      console.error('Import error:', err);
      return false;
    }
  };

  // Reset to initial clean state
  const resetToDefault = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setServices(initialServices);
    setSkills(initialSkills);
    setTestimonials(initialTestimonials);
    localStorage.removeItem('boutaba_profile');
    localStorage.removeItem('boutaba_projects');
    localStorage.removeItem('boutaba_services');
    localStorage.removeItem('boutaba_skills');
    localStorage.removeItem('boutaba_testimonials');
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        profile,
        setProfile,
        projects,
        services,
        setServices,
        skills,
        setSkills,
        testimonials,
        setTestimonials,
        adminPin,
        isAdminAuthenticated,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminViewActive,
        setIsAdminViewActive,
        loginAdmin,
        logoutAdmin,
        updateAdminPin,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        moveProject,
        selectedProject,
        setSelectedProject,
        exportData,
        importData,
        resetToDefault
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
