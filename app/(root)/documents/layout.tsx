import { Room } from "./[slug]/Room";

interface IDocumentLayout {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: IDocumentLayout) => {
  return (
    <Room>
      <main className="min-h-screen w-screen overflow-x-hidden">
        {children}
      </main>
    </Room>
  );
};

export default DocumentsLayout;
