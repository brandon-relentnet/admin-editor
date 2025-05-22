import PopupMenu from "@/components/PopupMenu";

export default function PopupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100">
      <div className="mockup-browser bg-base-300/30 border-2 border-base-300 shadow-xl">
        <div className="mockup-browser-toolbar">
          <div className="input !text-lg border-2">https://myscrollr.com</div>
        </div>
        <PopupMenu />
      </div>
    </div>
  );
}
