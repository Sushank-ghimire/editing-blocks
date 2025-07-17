"use client";

import Navbar from "./_components/Navbar";
import TemplatesGallary from "./_components/template-gallary";
import UserDocuments from "./_components/UserDocuments";

const Homepage = () => {
  return (
    <main className="min-h-screen w-screen">
      <div className="w-full flex h-fit items-center">
        <Navbar />
      </div>
      <div className="mt-8">
        <TemplatesGallary />
        <UserDocuments />
      </div>
    </main>
  );
};

export default Homepage;
