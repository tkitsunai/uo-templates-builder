import { Toaster } from 'react-hot-toast';
import { useTemplate } from './hooks/useTemplate';
import { Layout } from './components/Layout';
import { Controls } from './components/Controls';
import { SkillSection } from './components/SkillSection';
import { EquipmentSection } from './components/EquipmentSection';
import { SummarySection } from './components/SummarySection';
import { TemplateList } from './components/TemplateList';

function App() {
  const {
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
    templateNameError
  } = useTemplate();

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4 sticky top-4">
          <TemplateList
            templates={savedTemplates}
            currentTemplateId={currentTemplateId}
            onLoad={loadTemplate}
            onDelete={deleteTemplate}
            onDuplicate={duplicateTemplate}
            onShare={shareSavedTemplate}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6 w-full">
          <Controls
            templateName={templateName}
            onTemplateNameChange={setTemplateName}
            onSave={saveTemplate}
            onNew={clearTemplate}
            onShare={shareTemplate}
            error={templateNameError}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <SkillSection
                skills={skills}
                onAddSkill={addSkill}
                onUpdateSkill={updateSkill}
                onRemoveSkill={removeSkill}
              />
              <EquipmentSection
                equipment={equipment}
                onAddEquipment={addEquipment}
                onUpdateEquipment={updateEquipment}
                onRemoveEquipment={removeEquipment}
              />
            </div>
            
            <div>
              <SummarySection
                summaries={summaries}
                totalRealValue={totalRealValue}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
