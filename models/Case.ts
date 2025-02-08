// models/Case.ts

import mongoose, { Model, model, Schema } from 'mongoose'

import { Case as CaseType } from '@/types/case'

interface ICase extends Omit<CaseType, '_id'>, mongoose.Document {}

const CaseSchema = new Schema<ICase>({
  userId: { type: String, required: true, index: true },
  issueDescription: { type: String, required: true },
  partiesInvolved: { type: String, required: true },
  incidentDate: { type: String, required: true },
  zipCode: { type: String, required: true },
  issueImpact: { type: [String], default: [] },
  otherImpact: { type: String },
  desiredResolution: { type: String, required: true },
  documents: { type: [String], default: [] },
  caseClassification: { type: String },
  relevantLaws: { type: [String], default: [] },
  jurisdiction: { type: String },
  recommendations: { type: [String], default: [] },
  deadlines: { type: [String], default: [] },
  strengthIndicators: { type: String },
  supportingDocumentation: { type: [String], default: [] },
  draftedCommunication: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

CaseSchema.index({ userId: 1, createdAt: -1 })

const Case: Model<ICase> =
  mongoose.models.Case || model<ICase>('Case', CaseSchema)

export default Case
