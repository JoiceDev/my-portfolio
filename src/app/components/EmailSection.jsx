"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    console.log("Formulário submetido!"); // Debug
    
    try {
      const data = {
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      };
      
      console.log("Dados do formulário:", data); // Debug
      
      // Validação no frontend
      if (!data.email || !data.subject || !data.message) {
        setError("Todos os campos são obrigatórios");
        setIsLoading(false);
        return;
      }

      const JSONdata = JSON.stringify(data);
      const endpoint = "/api/send";

      console.log("Enviando para:", endpoint); // Debug

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);
      console.log("Response status:", response.status); // Debug
      
      const resData = await response.json();
      console.log("Response data:", resData); // Debug

      if (response.status === 200) {
        console.log("Message sent successfully!");
        setEmailSubmitted(true);
        // Limpar o formulário
        e.target.reset();
      } else {
        setError(resData.error || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/JoiceDev">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://www.linkedin.com/in/joicegoncalves-dev/">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <div className="text-center">
            <p className="text-green-500 text-lg font-semibold mb-4">
              ✅ Email sent successfully!
            </p>
            <button
              onClick={() => {
                setEmailSubmitted(false);
                setError("");
              }}
              className="text-primary-500 hover:text-primary-400 underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email *
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                disabled={isLoading}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 disabled:opacity-50"
                placeholder="email@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject *
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                disabled={isLoading}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 disabled:opacity-50"
                placeholder="Just saying hi"
              />
            </div>
            
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message *
              </label>
              <textarea
                name="message"
                id="message"
                required
                disabled={isLoading}
                rows="5"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 disabled:opacity-50"
                placeholder="Let's talk about..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;