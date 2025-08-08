import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Modal component to display assignment content
const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full text-black">
        <h3 className="text-xl font-semibold mb-4">Assignment Content</h3>
        <img src={content} alt="Assessment Content Link" />
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Assignment component
const Assignment = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [subjects, setSubjects] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [userId, setUserId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setUserId(response.data._id);
        setCourseId(response.data.course);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
    fetchProfileData();
  }, [isAuthenticated, navigate, token]);

  // Fetch assignments
  useEffect(() => {
    if (userId && courseId) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(
            `/api/student/getSubjectPendingAssessment/${userId}/${courseId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setSubjects(response.data || []);
          console.log("resoposne = " + JSON.stringify(response.data));
        } catch (err) {
          console.error("Error fetching subjects:", err);
        }
      };
      fetchSubjects();
    }
  }, [userId, courseId, token]);

  // Handle file upload
  const handleFileUpload = async (subjectId, assignmentId, fileLink) => {
    try {
      console.log("comming");
      console.log("file uploading");
      console.log("fileLink " + fileLink);
      console.log("subject Id = " + subjectId);
      console.log("assignment Id = " + assignmentId);
      const response = await axios.post(
        `/api/student/uploadAssignment`,
        {
          userId,
          assignmentId,
          subjectId: subjectId,
          submittedContent: fileLink,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        const updatedSubjects = subjects.map((subject) =>
          subject._id === subjectId
            ? {
                ...subject,
                assessments: subject.assessments.map((assignment) =>
                  assignment.assessmentID === assignmentId
                    ? {
                        ...assignment,
                        status: "Submitted",
                        submittedBy: [...assignment.submittedBy, userId],
                      }
                    : assignment
                ),
              }
            : subject
        );
        setSubjects(updatedSubjects);
        alert("Assignment submitted successfully!");
      }
    } catch (err) {
      console.error("Failed to submit assignment:", err);
    }
  };

  // Dummy convertFileToLink function to simulate file conversion
  const convertFileToLink = async (subjectId, assignmentId, file) => {
    console.log(subjectId);
    if (!file) {
      console.error("Profile picture is not defined");
      return;
    }

    // Ensure the file type is an image (jpeg or png)
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      console.error("Invalid file type. Only JPEG and PNG are supported.");
      return;
    }

    // Prepare the FormData for Cloudinary upload
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "AuraTracker");
    data.append("cloud_name", "dqx48ke30");

    // Upload to Cloudinary
    fetch("https://api.cloudinary.com/v1_1/dqx48ke30/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          console.log(
            "Assignment upload in cloudinary successfully:",
            data.secure_url
          );
          handleFileUpload(subjectId, assignmentId, data.secure_url);
        } else {
          console.error(
            "Failed to upload assignment to Cloudinary:",
            data.error.message
          );
          return "";
        }
      })
      .catch((err) => {
        console.error("An error occurred while uploading the Assignment:", err);
      });
  };
  const isAssignmentSubmittedByUser = (assignment) =>
    assignment.submittedBy.some((submission) => submission.student === userId);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div
      className="p-6 bg-black bg-opacity-50 text-white border border-gray-400 rounded-lg w-3/4 mx-auto overflow-y-scroll "
      style={{ height: "500px" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Assignments by Subject
      </h2>

      {/* Tab buttons */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab("Pending")}
          className={`px-4 py-2 ${
            activeTab === "Pending" ? "bg-red-800" : "bg-gray-800"
          } border border-gray-400 rounded-l-lg`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("Submitted")}
          className={`px-4 py-2 ${
            activeTab === "Submitted" ? "bg-green-800" : "bg-gray-800"
          } border border-gray-400 rounded-r-lg`}
        >
          Submitted
        </button>
      </div>

      {/* Render assignments for each subject */}
      {subjects?.map((subject, subjectIndex) => (
        // <div key={subject._id}>
        <div key={subject.subjectName} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{subject.subjectName}</h3>
          {subject.assessments &&
            subject.assessments
              .filter((assignment) => {
                const isSubmitted = isAssignmentSubmittedByUser(assignment);
                return activeTab === "Pending" ? !isSubmitted : isSubmitted;
              })
              ?.map((assignment) => (
                <div
                  key={assignment._id}
                  className="flex items-center justify-between p-4 mb-2 border border-gray-400 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">
                      {assignment.assessmentName}
                    </h4>
                    <p className="text-sm">Due: {assignment.assessmentDate}</p>
                  </div>
                  {activeTab === "Pending" && (
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <span className="mr-2 text-blue-500 cursor-pointer">
                          Upload
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            convertFileToLink(
                              subject.subjectId,
                              assignment._id,
                              e.target.files[0]
                            )
                          }
                        />
                      </label>
                    </div>
                  )}
                  <button
                    onClick={() => openModal(assignment.assessmentContent)}
                    className="ml-4 text-blue-500 hover:underline"
                  >
                    View Assignment Content
                  </button>
                </div>
              ))}
        </div>
      ))}

      {/* Modal for displaying assignment content */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default Assignment;
