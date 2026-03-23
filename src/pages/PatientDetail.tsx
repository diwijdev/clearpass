import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPatient,
  fetchObservations,
  fetchConditions,
} from "../services/fhirService";
import type { Patient, Observation, Condition } from "../types/fhir";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/SideBar";

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const [p, o, c] = await Promise.all([
        fetchPatient(id),
        fetchObservations(id),
        fetchConditions(id),
      ]);
      setPatient(p);
      setObservations(o);
      setConditions(c);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-on-surface-variant">Loading patient data...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-on-surface-variant">Patient not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <Sidebar />
      <main className="pt-20 pb-24 px-4 md:ml-72 max-w-2xl mx-auto md:mx-0">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-on-surface-variant text-sm mt-4 mb-6 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to ward
        </button>

        {/* Patient header */}
        <section
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
        </section>

        {/* Vitals */}
        <section className="space-y-3 mb-6">
          <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
            Vitals Snapshot
          </h3>
          {observations.length === 0 ? (
            <p className="text-on-surface-variant text-sm px-2">
              No vitals recorded.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {observations.slice(0, 4).map((obs) => (
                <div
                  key={obs.id}
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
                </div>
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
              <p className="text-on-surface-variant text-sm p-4">
                No conditions recorded.
              </p>
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
      </main>
      <BottomNav />
    </div>
  );
}

export default PatientDetail;
