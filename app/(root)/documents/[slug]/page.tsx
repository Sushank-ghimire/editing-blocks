interface IDocumentPageProps {
  params: Promise<{ slug: string }>;
}

const DocumentPage = async ({ params }: IDocumentPageProps) => {
  const param = await params;
  return <div>Document ID : {param.slug}</div>;
};

export default DocumentPage;
