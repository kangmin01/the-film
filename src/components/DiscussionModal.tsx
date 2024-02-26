"use client";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function DiscussionModal({ children, onClose }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl">{children}</div>
    </section>
  );
}
