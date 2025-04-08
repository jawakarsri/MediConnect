"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Upload,
  FileText,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    pincode: "",
    department: "",
    date: new Date(),
    report: null as File | null,
    reason: "",
  });

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "General Medicine",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, report: e.target.files[0] });
    }
  };

  const isStep1Valid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.age &&
      formData.gender
    );
  };

  const isStep2Valid = () => {
    return (
      formData.contact &&
      formData.address &&
      formData.pincode &&
      formData.department
    );
  };

  const isStep3Valid = () => {
    return formData.reason !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Show success message
    setStep(4);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2",
                    step >= i
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300"
                  )}
                >
                  {step > i ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{i}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid()}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contact"
                        placeholder="Enter contact number"
                        className="pl-10"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        placeholder="Enter your address"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept.toLowerCase()}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!isStep2Valid()}
                      className="w-full"
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Additional Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Appointment Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(formData.date, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) =>
                            setFormData({ ...formData, date: date || new Date() })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="report">Upload Report (Optional)</Label>
                    <div className="mt-1">
                      <Label
                        htmlFor="report-upload"
                        className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
                      >
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, PNG up to 10MB
                          </p>
                        </div>
                        <input
                          id="report-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </Label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="reason"
                        placeholder="Please describe your reason for visit"
                        className="pl-10"
                        value={formData.reason}
                        onChange={(e) =>
                          setFormData({ ...formData, reason: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="w-full"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStep3Valid()}
                      className="w-full"
                    >
                      Register
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Appointment Registered!
                </h2>
                <p className="text-gray-600 mb-6">
                  We have received your appointment request. You will receive a
                  confirmation email shortly.
                </p>
                <Button onClick={() => window.location.href = "/"}>
                  Return to Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right section */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">
              Your Health, Our Priority
            </h2>
            <p className="text-gray-600">
              Schedule your appointment with our experienced healthcare
              professionals. We're here to provide you with the best medical care
              and support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 