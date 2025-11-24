import { useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Skill, Equipment, Template, SkillSummary, SavedTemplate } from '../types';

const STORAGE_KEY = 'uo-template-builder-data';
const TEMPLATES_KEY = 'uo-template-builder-list';

const DEFAULT_SKILL_SLOTS = 8;
const DEFAULT_EQUIPMENT_SLOTS = 3;

const createDefaultSkills = (): Skill[] => {
  return Array.from({ length: DEFAULT_SKILL_SLOTS }, () => ({
    id: crypto.randomUUID(),
    name: '',
    value: 0
  }));
};

const createDefaultEquipment = (): Equipment[] => {
  return Array.from({ length: DEFAULT_EQUIPMENT_SLOTS }, () => ({
    id: crypto.randomUUID(),
    name: '',
    skillName: '',
    value: 0
  }));
};

export const useTemplate = () => {
  const [templateName, setTemplateName] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>(createDefaultSkills());
  const [equipment, setEquipment] = useState<Equipment[]>(createDefaultEquipment());
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [templateNameError, setTemplateNameError] = useState<string>('');

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    // Load current working state
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed: Template = JSON.parse(savedData);
        setTemplateName(parsed.name || '');
        setSkills(parsed.skills || createDefaultSkills());
        setEquipment(parsed.equipment || createDefaultEquipment());
      } catch (e) {
        console.error('Failed to load template from storage', e);
      }
    }

    // Load saved templates list
    const savedList = localStorage.getItem(TEMPLATES_KEY);
    if (savedList) {
      try {
        setSavedTemplates(JSON.parse(savedList));
      } catch (e) {
        console.error('Failed to load templates list', e);
      }
    }

    // Check for URL params for shared template
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('data');
    if (sharedData) {
      try {
        const decoded = atob(sharedData);
        const parsed: Template = JSON.parse(decodeURIComponent(decoded));
        setTemplateName(parsed.name || '');
        setSkills(parsed.skills || createDefaultSkills());
        setEquipment(parsed.equipment || createDefaultEquipment());
        setCurrentTemplateId(null); // Shared template is new/unsaved
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
        toast.success('Shared template loaded!');
      } catch (e) {
        console.error('Failed to load shared template', e);
        toast.error('Failed to load shared template.');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save current working state to LocalStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    const data: Template = { name: templateName, skills, equipment };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [templateName, skills, equipment, isLoaded]);

  // Save templates list to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(savedTemplates));
  }, [savedTemplates, isLoaded]);

  const addSkill = useCallback(() => {
    setSkills(prev => [...prev, { id: crypto.randomUUID(), name: '', value: 0 }]);
  }, []);

  const updateSkill = useCallback((id: string, field: keyof Skill, value: string | number) => {
    setSkills(prev => prev.map(skill => {
      if (skill.id === id) {
        return { ...skill, [field]: value };
      }
      return skill;
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  }, []);

  const addEquipment = useCallback(() => {
    setEquipment(prev => [...prev, { id: crypto.randomUUID(), name: '', skillName: '', value: 0 }]);
  }, []);

  const updateEquipment = useCallback((id: string, field: keyof Equipment, value: string | number) => {
    setEquipment(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  }, []);

  const removeEquipment = useCallback((id: string) => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  }, []);

  const summaries = useMemo<SkillSummary[]>(() => {
    const skillNames = new Set<string>();
    skills.forEach(s => s.name && skillNames.add(s.name));
    equipment.forEach(e => e.skillName && skillNames.add(e.skillName));

    const result: SkillSummary[] = [];
    skillNames.forEach(name => {
      const skill = skills.find(s => s.name === name);
      const realValue = skill ? Number(skill.value) : 0;
      
      const boostValue = equipment
        .filter(e => e.skillName === name)
        .reduce((sum, e) => sum + Number(e.value), 0);

      result.push({
        name,
        realValue,
        boostValue,
        adjustedValue: realValue + boostValue
      });
    });
    
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [skills, equipment]);

  const totalRealValue = useMemo(() => {
    return skills.reduce((sum, s) => sum + Number(s.value), 0);
  }, [skills]);

  const shareTemplate = useCallback(() => {
    const data: Template = { name: templateName, skills, equipment };
    const json = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(json));
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Share URL copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy URL.');
    });
  }, [templateName, skills, equipment]);

  const saveTemplate = useCallback(() => {
    if (!templateName.trim()) {
      setTemplateNameError('Template name is required.');
      toast.error('Please enter a template name.');
      return false;
    }
    setTemplateNameError('');

    // Check if a template with this name already exists
    const existingTemplate = savedTemplates.find(
      t => t.name.trim().toLowerCase() === templateName.trim().toLowerCase()
    );

    // Determine the ID to use:
    // 1. If we are editing an existing template (currentTemplateId), keep using it.
    // 2. UNLESS we renamed it to match another existing template, in which case we overwrite that one (user preference).
    // 3. If we are creating new (currentTemplateId is null), but name exists, overwrite that one.
    // 4. Otherwise, generate new ID.
    
    let targetId = currentTemplateId;

    if (existingTemplate) {
      if (!targetId) {
        // Case: New template, but name exists -> Overwrite
        targetId = existingTemplate.id;
      } else if (targetId !== existingTemplate.id) {
        // Case: Renaming current template to match another existing one
        // We will overwrite the *other* one. 
        // Note: The original template (currentTemplateId) will remain unchanged in the list as we are effectively "Saving As" the other one.
        targetId = existingTemplate.id;
      }
    }

    const newTemplate: SavedTemplate = {
      id: targetId || crypto.randomUUID(),
      name: templateName,
      skills,
      equipment,
      updatedAt: Date.now()
    };

    setSavedTemplates(prev => {
      const existingIndex = prev.findIndex(t => t.id === newTemplate.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newTemplate;
        return updated;
      }
      return [...prev, newTemplate];
    });
    
    setCurrentTemplateId(newTemplate.id);
    toast.success('Template saved successfully!');
    return true;
  }, [templateName, skills, equipment, currentTemplateId, savedTemplates]);

  const loadTemplate = useCallback((id: string) => {
    const template = savedTemplates.find(t => t.id === id);
    if (template) {
      setTemplateName(template.name);
      setSkills(template.skills);
      setEquipment(template.equipment);
      setCurrentTemplateId(template.id);
      setTemplateNameError('');
      toast.success(`Loaded template: ${template.name}`);
    }
  }, [savedTemplates]);

  const clearTemplate = useCallback(() => {
    if (window.confirm('Clear current template? Unsaved changes will be lost.')) {
      setTemplateName('');
      setSkills(createDefaultSkills());
      setEquipment(createDefaultEquipment());
      setCurrentTemplateId(null);
      toast('Template cleared.', { icon: '🧹' });
    }
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setSavedTemplates(prev => prev.filter(t => t.id !== id));
      if (currentTemplateId === id) {
        // Don't call clearTemplate here to avoid double confirm
        setTemplateName('');
        setSkills(createDefaultSkills());
        setEquipment(createDefaultEquipment());
        setCurrentTemplateId(null);
      }
      toast.success('Template deleted.');
    }
  }, [currentTemplateId]);

  const duplicateTemplate = useCallback((id: string) => {
    const template = savedTemplates.find(t => t.id === id);
    if (template) {
      setTemplateName(`${template.name} - Copy`);
      // Deep copy to avoid reference issues
      setSkills(JSON.parse(JSON.stringify(template.skills)));
      setEquipment(JSON.parse(JSON.stringify(template.equipment)));
      setCurrentTemplateId(null); // Treat as new unsaved template
      toast.success('Template duplicated! (Unsaved)');
    }
  }, [savedTemplates]);

  const shareSavedTemplate = useCallback((id: string) => {
    const template = savedTemplates.find(t => t.id === id);
    if (!template) return;

    const data: Template = { 
        name: template.name, 
        skills: template.skills, 
        equipment: template.equipment 
    };
    const json = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(json));
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success(`Share URL for "${template.name}" copied!`);
    }).catch(() => {
      toast.error('Failed to copy URL.');
    });
  }, [savedTemplates]);

  return {
    templateName,
    setTemplateName,
    skills,
    equipment,
    addSkill,
    updateSkill,
    removeSkill,
    addEquipment,
    updateEquipment,
    removeEquipment,
    summaries,
    totalRealValue,
    shareTemplate,
    shareSavedTemplate,
    savedTemplates,
    saveTemplate,
    loadTemplate,
    deleteTemplate,
    duplicateTemplate,
    clearTemplate,
    currentTemplateId,
    templateNameError,
    setTemplateNameError
  };
};
