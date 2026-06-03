import { Check, Truck, Package, Home } from "lucide-react";

export default function ShippingWizard({ status }: { status: string }) {
  const steps = [
    { id: 'dikemas', label: 'Dikemas', icon: Package },
    { id: 'dikirim', label: 'Dikirim', icon: Truck },
    { id: 'selesai', label: 'Diterima', icon: Home },
  ];

  // Tentukan langkah aktif
  const currentStep = steps.findIndex(s => s.id === status?.toLowerCase());

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center relative">
        {/* Garis Penghubung */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-blue-500 transition-all duration-500 -z-0" 
          style={{ width: `${currentStep === -1 ? 0 : (currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                {index < currentStep ? <Check size={16} /> : <StepIcon size={14} />}
              </div>
              <span className={`text-[10px] font-black uppercase mt-2 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}