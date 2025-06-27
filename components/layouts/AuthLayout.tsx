interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: IAuthLayout) => {
  return (
    <div className="min-h-screen w-screen bg-background flex-col">
      {children}
    </div>
  );
};

export default AuthLayout;
