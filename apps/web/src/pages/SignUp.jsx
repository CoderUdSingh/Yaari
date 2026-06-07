import React, { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SignUp = () => {
  const today = useMemo(() => new Date(), []);
  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const startYear = currentYear - 120;
    const yearArray = [];
    for (let i = currentYear; i > startYear; i--) {
      yearArray.push(i);
    }
    return yearArray;
  }, [today]);

  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [showPassword, setShowPassword] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const phoneError = useMemo(() => {
    if (formData.phone.length === 0) return "";
    if (formData.phone.length !== 10) return "Phone number is not valid";
    return "";
  }, [formData.phone]);

  const populateDays = useCallback(
    (month, year) => {
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const totalDays = Array.from(
        { length: lastDayOfMonth },
        (item, i) => i + 1,
      );
      setDaysInMonth(totalDays);
      if (selectedDay > lastDayOfMonth) setSelectedDay(lastDayOfMonth);
    },
    [selectedDay],
  );

  useEffect(() => {
    populateDays(selectedMonth, selectedYear);
  }, [selectedYear, selectedMonth, populateDays]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const finalPayload = {
      ...formData,
      dob: `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`,
    };

    try {
      const response = await axiosInstance.post("/auth/signup", finalPayload);
      console.log("Signup Success:", response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectDob = (e) => {
    if (e.target.name === "day") {
      setSelectedDay(parseInt(e.target.value));
    }
    if (e.target.name === "month") {
      const newMonth = parseInt(e.target.value, 10);
      setSelectedMonth(newMonth);
      populateDays(newMonth, selectedYear);
    }
    if (e.target.name === "year") {
      const newYear = e.target.value;
      setSelectedYear(newYear);
      populateDays(selectedMonth, newYear);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4 overflow-hidden">
      {/* Reduced bottom margin on headings to save space */}
      <h1 className="text-4xl text-blue-600 font-extrabold tracking-tight mb-1">
        Yaari
      </h1>
      <p className="text-lg font-medium text-gray-700 mb-4">
        Yaari shouldn't come to a stop
      </p>

      {/* Main Card */}
      <div className="bg-white w-full max-w-105 shadow-xl px-5 py-4 rounded-xl text-center">
        <p className="mb-3 font-semibold text-xl border-b pb-2 border-gray-200 text-gray-800">
          Create a new account
        </p>

        {errorMsg && (
          <div className="mb-3 p-2 bg-red-100 text-red-600 rounded text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* gap-3 instead of gap-4 for tighter packing */}
        <form className="flex flex-col gap-3 text-left" onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="flex gap-2">
            <input
              className="border border-gray-300 rounded-md px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleDetailsChange}
              name="firstName"
              required
            />
            <input
              className="border border-gray-300 rounded-md px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleDetailsChange}
              name="lastName"
              required
            />
          </div>

          {/* DOB Section - Grouped together to prevent flex gaps */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
              Date of birth
            </p>
            <section className="flex gap-2">
              <select
                name="day"
                value={selectedDay}
                onChange={handleSelectDob}
                className="border-gray-300 border flex-1 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {daysInMonth.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={selectedMonth}
                onChange={handleSelectDob}
                className="border-gray-300 border flex-1 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="" disabled>
                  Month
                </option>
                {month_names.map((item, i) => (
                  <option key={i + 1} value={i + 1}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={selectedYear}
                onChange={handleSelectDob}
                className="border-gray-300 border flex-1 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {years.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </section>
          </div>

          {/* Gender Section - Grouped together */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">Gender</p>
            <div className="flex gap-2">
              <label className="border-gray-300 border cursor-pointer flex justify-between items-center flex-1 rounded-md px-3 py-1.5 text-sm">
                Male
                <input
                  onChange={handleGenderChange}
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  className="cursor-pointer"
                />
              </label>
              <label className="border-gray-300 border cursor-pointer flex justify-between items-center flex-1 rounded-md px-3 py-1.5 text-sm">
                Female
                <input
                  onChange={handleGenderChange}
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  className="cursor-pointer"
                />
              </label>
              <label className="border-gray-300 border cursor-pointer flex justify-between items-center flex-1 rounded-md px-3 py-1.5 text-sm">
                Other
                <input
                  onChange={handleGenderChange}
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  className="cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Contact & Password Section */}
          <div className="flex flex-col gap-3">
            <div>
              <input
                required
                onChange={handleDetailsChange}
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="Mobile number"
                className="border-gray-300 border w-full rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>

            <input
              required
              onChange={handleDetailsChange}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email address"
              className="border-gray-300 border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative flex items-center">
              <input
                required
                onChange={handleDetailsChange}
                className="border-gray-300 border rounded-md px-3 py-1.5 text-sm w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={phoneError.length > 0 || isSubmitting}
            className={`mt-2 py-2 rounded-md text-white font-bold text-lg transition-colors 
              ${phoneError.length > 0 || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already an user?{" "}
          <Link className="text-blue-500" to="/login">
            Sign In
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
