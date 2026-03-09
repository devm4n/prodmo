import { Button } from "@/components/ui/button";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupCard() {
  const { accountPresent, setAccountPresent } = useContext(AuthContext);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const handleSubmit = async () => {
    try {
      await register(form.username, form.password);
      navigate("/");
    } catch (err) {
      const data = err.response?.data;

      const message =
        data.detail ||
        data.non_field_errors?.[0] ||
        Object.values(data).flat()[0];
      setError(message);
      setTimeout(() => setError(null), 3000);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <Toast message={error} type="error" onClose={() => setError(null)} />

      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to create to your account
        </CardDescription>
        <CardAction>
          <Button
            onClick={() => setAccountPresent(!accountPresent)}
            variant="link"
          >
            <Link to="/signin">Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                id="username"
                type="username"
                placeholder="johndoe"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                id="password"
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleSubmit} type="submit" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
