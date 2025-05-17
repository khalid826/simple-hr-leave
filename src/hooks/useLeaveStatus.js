import { useState } from 'react'

const useLeaveStatus = () => {
  const leaveTypes = ['Annual', 'Sick', 'Personal', 'Maternity', 'Unpaid']
  const statusOptions = ['Pending', 'Approved', 'Rejected']
  
  const generateRandomLeave = () => ({
    type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    days: Math.floor(Math.random() * 10) + 1
  })

  const [currentStatus, setCurrentStatus] = useState(generateRandomLeave().status)
  const [currentType] = useState(generateRandomLeave().type)

  return {
    leaveTypes,
    statusOptions,
    currentStatus,
    currentType,
    setCurrentStatus,
    generateRandomLeave
  }
}

export default useLeaveStatus