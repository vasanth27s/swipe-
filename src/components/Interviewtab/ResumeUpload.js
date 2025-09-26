import { useState } from "react"
import { useDispatch } from "react-redux"
import { useDropzone } from "react-dropzone"
import { addCandidate } from "@/store/slices/candidateSlice"
import { setPhase, setMissingFields } from "@/store/slices/interviewSlice"
import { setError, setLoading } from "@/store/slices/uiSlice"

export default function ResumeUpload() {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const processResume = async (file) => {
    setUploading(true)
    dispatch(setLoading(true))

    try {
      const mockExtractedData = {
        name: "",
        email: "",
        phone: "",
        resumeFile: file,
      }

      const missing = []
      if (!mockExtractedData.name) missing.push("name")
      if (!mockExtractedData.email) missing.push("email")
      if (!mockExtractedData.phone) missing.push("phone")

      if (missing.length > 0) {
        dispatch(setMissingFields(missing))
        dispatch(addCandidate(mockExtractedData))
        dispatch(setPhase("collecting-info"))
      } else {
        dispatch(addCandidate(mockExtractedData))
        dispatch(setPhase("interview"))
      }
    } catch (error) {
      dispatch(setError("Failed to process resume. Please try again."))
    } finally {
      setUploading(false)
      dispatch(setLoading(false))
    }
  }

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0]
      if (selectedFile) {
        setFile(selectedFile)
      }
    },
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  const handleContinue = () => {
    if (file) processResume(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-500">
          <h2 className="text-2xl font-bold text-white">Upload Your Resume</h2>
          <p className="text-blue-100 text-sm mt-1">
            Begin your AI-powered interview journey
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-gray-50 border-b border-gray-200">
          {["Upload", "Verify", "Start Interview"].map((step, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                  i === 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  i === 0 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="px-8 py-10">
          <div
            {...getRootProps()}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-10 text-center block hover:border-blue-400 transition"
          >
            <input {...getInputProps()} disabled={uploading} />
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">📄</div>
              {!file ? (
                <>
                  <p className="text-gray-700 font-medium">
                    {isDragActive ? "Drop your resume here" : "Drag & drop your resume here"}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Supports PDF and DOCX (max 10MB)
                  </p>
                  <span className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                    Browse Files
                  </span>
                </>
              ) : uploading ? (
                <div className="text-center w-full max-w-sm">
                  <p className="text-blue-600 font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500 mb-3">Processing your resume...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full animate-pulse"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-green-600 font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">File ready for upload</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Highlights */}
          <div className="mt-8 grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl mb-2">🔒</div>
              <p className="text-sm font-medium text-gray-700">Secure & Local</p>
              <p className="text-xs text-gray-500">Data never leaves your device</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-green-600 text-2xl mb-2">🧩</div>
              <p className="text-sm font-medium text-gray-700">Smart Parsing</p>
              <p className="text-xs text-gray-500">Auto-extracts Name, Email, Phone</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-purple-600 text-2xl mb-2">🎯</div>
              <p className="text-sm font-medium text-gray-700">Interview Ready</p>
              <p className="text-xs text-gray-500">6 questions (2 Easy, 2 Med, 2 Hard)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!file || uploading}
            className={`px-6 py-2 rounded-lg font-semibold shadow transition ${
              file && !uploading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {uploading ? "Processing..." : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  )
}
