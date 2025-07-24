import UserForm from "../components/UserForm";
import PageWrapper from "../components/PageWrapper";

export default function Start({ setUser }) {
  return (
    <PageWrapper>
      <UserForm setUser={setUser} />
    </PageWrapper>
  );
}
