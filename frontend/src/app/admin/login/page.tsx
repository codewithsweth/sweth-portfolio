import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  return (
    <div className="max-w-sm mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>
      <form className="space-y-4">
        <Input name="email" type="email" placeholder="Admin Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {true && <p className="text-red-500 text-sm">error</p>}
        <Button type="submit" className="w-full">Log In</Button>
      </form>
    </div>
  );
}
