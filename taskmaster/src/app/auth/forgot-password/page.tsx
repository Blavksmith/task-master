import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-indigo-600 rounded-lg"></div>
            <span className="text-2xl font-bold text-gray-900">TaskMaster</span> */}
          </Link>
        </div>

        {/* Forgot Password Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Reset password</CardTitle>
            <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Send Reset Link Button */}
              <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                Send reset link
              </Button>

              {/* Back to Login */}
              <div className="text-center pt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
