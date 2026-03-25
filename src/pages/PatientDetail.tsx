import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchPatient,
  fetchObservations,
  fetchConditions,
} from "../services/fhirService";
import type { Patient, Observation, Condition } from "../types/fhir";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/SideBar";
import BrandLockup from "../components/BrandLockup";
import HandoffNoteSection from '../components/HandoffNote'
import ADLNotes from '../components/ADLNotes'
import PendingTasks from '../components/PendingTasks'

const tabVariants = {
  enter: (dir: number) => ({ x: dir * 30, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -30, opacity: 0 }),
}

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'handoff'>('details')

  const direction = activeTab === 'handoff' ? 1 : -1

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const [p, o, c] = await Promise.allSettled([
          fetchPatient(id),
          fetchObservations(id),
          fetchConditions(id),
        ]);
        if (p.status === 'fulfilled') setPatient(p.value);
        if (o.status === 'fulfilled') setObservations(o.value);
        if (c.status === 'fulfilled') setConditions(c.value);
      } catch (err) {
        console.error('Failed to load patient data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <BrandLockup />
          <p className="text-on-surface-variant">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <BrandLockup className="mb-2" />
        <span className="material-symbols-outlined text-4xl text-outline-variant">
          error_outline
        </span>
        <p className="text-on-surface-variant font-medium">
          Couldn't load patient data
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all"
          style={{
            background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
            color: 'var(--color-on-primary)',
          }}>
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to ward
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <Sidebar />
      <main className="pt-20 pb-24 px-4 md:ml-72 max-w-2xl mx-auto md:mx-0">
        {/* Back button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-on-surface-variant text-sm mt-4 mb-6 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to ward
        </motion.button>

        {/* Patient header */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="p-6 rounded-xl shadow-sm space-y-4 mb-6"
          style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-1 block">
                Patient Record
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-primary">
                {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
              </h2>
              <p className="text-on-surface-variant font-medium text-sm">
                ID-{patient.id}
              </p>
            </div>
            <div
              className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{
                backgroundColor: "var(--color-primary-container)",
                color: "var(--color-on-primary-container)",
              }}
            >
              Ward 4B
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                Gender
              </p>
              <p className="font-semibold text-primary capitalize">
                {patient.gender ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                DOB
              </p>
              <p className="font-semibold text-primary">
                {patient.birthDate ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                Conditions
              </p>
              <p className="font-semibold text-primary">
                {conditions.length > 0 ? conditions[0].code?.text : "N/A"}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Tab content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {activeTab === 'details' ? (
              <>
                {/* Vitals */}
                <section className="space-y-3 mb-6">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
                    Vitals Snapshot
                  </h3>
                  {observations.length === 0 ? (
                    <div className="rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2"
                      style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
                      <span className="material-symbols-outlined text-3xl text-outline-variant">
                        monitor_heart
                      </span>
                      <p className="text-sm font-semibold text-on-surface-variant">
                        No vitals recorded
                      </p>
                      <p className="text-xs text-outline">
                        Vitals will appear here once observations are charted.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {observations.slice(0, 4).map((obs, i) => (
                        <motion.div
                          key={obs.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.08, ease: 'easeOut' }}
                          className="p-4 rounded-xl flex flex-col justify-between"
                          style={{
                            backgroundColor: "var(--color-surface-container-low)",
                          }}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                            {obs.code?.text ??
                              obs.code?.coding?.[0]?.display ??
                              "Observation"}
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            {obs.valueQuantity
                              ? `${obs.valueQuantity.value} ${obs.valueQuantity.unit}`
                              : (obs.valueString ?? "N/A")}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Conditions */}
                <section className="space-y-3 mb-6">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
                    Active Conditions
                  </h3>
                  <div
                    className="rounded-xl overflow-hidden shadow-sm"
                    style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
                  >
                    {conditions.length === 0 ? (
                      <div className="p-8 flex flex-col items-center justify-center text-center space-y-2">
                        <span className="material-symbols-outlined text-3xl text-outline-variant">
                          diagnosis
                        </span>
                        <p className="text-sm font-semibold text-on-surface-variant">
                          No active conditions
                        </p>
                        <p className="text-xs text-outline">
                          Conditions from the patient record will be listed here.
                        </p>
                      </div>
                    ) : (
                      conditions.map((condition, index) => (
                        <div
                          key={condition.id}
                          className="flex items-center p-4"
                          style={{
                            borderBottom:
                              index < conditions.length - 1
                                ? "1px solid var(--color-surface-container-low)"
                                : "none",
                          }}
                        >
                          <span className="material-symbols-outlined text-outline-variant mr-4">
                            vital_signs
                          </span>
                          <p className="text-sm font-semibold text-primary">
                            {condition.code?.text ??
                              condition.code?.coding?.[0]?.display ??
                              "Unknown condition"}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* ADL Notes */}
                <ADLNotes patientId={id!} />
              </>
            ) : (
              <>
                {/* Pending Tasks */}
                <PendingTasks patientId={id!} />

                {/* Handoff Note */}
                <HandoffNoteSection patientId={id!} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default PatientDetail;
