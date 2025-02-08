// types/case.ts
export interface Case {
  dueDate: string | number | Date
  priority: any
  status: string
  _id: string
  userId: string
  issueDescription: string
  partiesInvolved: string
  incidentDate: string
  zipCode: string
  issueImpact: string[]
  otherImpact: string
  desiredResolution: string
  documents: string[]
  caseClassification?: string
  relevantLaws?: string[]
  jurisdiction?: string
  recommendations?: string[]
  deadlines?: string[]
  strengthIndicators?: string
  supportingDocumentation?: string[]
  draftedCommunication?: string
  createdAt: Date
  updatedAt: Date
}
