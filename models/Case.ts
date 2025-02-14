// models/Case.ts
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore'

export interface Case {
  id?: string
  userId: string
  issueDescription: string
  partiesInvolved: string
  incidentDate: string
  zipCode: string
  issueImpact: string[]
  otherImpact?: string
  desiredResolution: string
  documents: string[]
  caseClassification?: string
  relevantLaws: string[]
  jurisdiction?: string
  recommendations: string[]
  deadlines: string[]
  strengthIndicators?: string
  supportingDocumentation: string[]
  draftedCommunication?: string
  createdAt: string
  updatedAt: string
}

export const caseConverter: FirestoreDataConverter<Case> = {
  toFirestore(caseData: WithFieldValue<Case>): DocumentData {
    return {
      userId: caseData.userId,
      issueDescription: caseData.issueDescription,
      partiesInvolved: caseData.partiesInvolved,
      incidentDate: caseData.incidentDate,
      zipCode: caseData.zipCode,
      issueImpact: caseData.issueImpact,
      otherImpact: caseData.otherImpact,
      desiredResolution: caseData.desiredResolution,
      documents: caseData.documents,
      caseClassification: caseData.caseClassification,
      relevantLaws: caseData.relevantLaws,
      jurisdiction: caseData.jurisdiction,
      recommendations: caseData.recommendations,
      deadlines: caseData.deadlines,
      strengthIndicators: caseData.strengthIndicators,
      supportingDocumentation: caseData.supportingDocumentation,
      draftedCommunication: caseData.draftedCommunication,
      createdAt: caseData.createdAt,
      updatedAt: caseData.updatedAt,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Case {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      userId: data.userId,
      issueDescription: data.issueDescription,
      partiesInvolved: data.partiesInvolved,
      incidentDate: data.incidentDate,
      zipCode: data.zipCode,
      issueImpact: data.issueImpact,
      otherImpact: data.otherImpact,
      desiredResolution: data.desiredResolution,
      documents: data.documents,
      caseClassification: data.caseClassification,
      relevantLaws: data.relevantLaws,
      jurisdiction: data.jurisdiction,
      recommendations: data.recommendations,
      deadlines: data.deadlines,
      strengthIndicators: data.strengthIndicators,
      supportingDocumentation: data.supportingDocumentation,
      draftedCommunication: data.draftedCommunication,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  },
}
