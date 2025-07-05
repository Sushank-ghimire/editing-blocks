import Editor from "./editor/page";

interface IDocumentPageProps {
  params: Promise<{ slug: string }>;
}

const DocumentPage = async ({ params }: IDocumentPageProps) => {
  const param = await params;
  console.log(param);

  return (
    <section className="min-h-screen w-screen">
      <Editor />
    </section>
  );
};

export default DocumentPage;
