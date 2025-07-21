import Editor from "./editor/page";

interface IDocumentPageProps {
  params: Promise<{ slug: string }>;
}

const DocumentPage = async ({}: IDocumentPageProps) => {
  return (
    <section className="min-h-screen w-screen">
      <Editor />
    </section>
  );
};

export default DocumentPage;
