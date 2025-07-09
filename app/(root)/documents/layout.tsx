// import { DocumentsNavbar } from "@/components/index";

interface IDocumentLayout {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: IDocumentLayout) => {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
      {/* <DocumentsNavbar /> */}
      {children}
    </main>
  );
};

export default DocumentsLayout;
