import DocumentsNavbar from "@/components/DocumentsNavbar";
import { Room } from "./[slug]/Room";

interface IDocumentLayout {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: IDocumentLayout) => {
  return (
    <Room>
      <main className="min-h-screen w-screen overflow-x-hidden">
        <DocumentsNavbar />
        {children}
      </main>
    </Room>
  );
};

export default DocumentsLayout;
