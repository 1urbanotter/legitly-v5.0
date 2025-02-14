// app/api/case/analyze/[id]/route.tsx
import { NextRequest, NextResponse } from 'next/server'

import { AnalysisResult } from '@/types/analysisResult'

const MODEL_NAME = 'gemini-pro'
const API_KEY = process.env.GOOGLE_API_KEY

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const caseId = params.id

  try {
    const caseResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/case/${caseId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!caseResponse.ok) {
      throw new Error(`Failed to fetch case: ${caseResponse.statusText}`)
    }

    const caseData = await caseResponse.json()
    const { issueDescription } = caseData.case

    if (!issueDescription) {
      throw new Error('Issue description is missing from case data.')
    }

    const prompt = `Analyze the following legal case description and provide the following in JSON format:
    - caseClassification: A brief classification of the case (e.g., "Contract Dispute", "Personal Injury").
    - relevantLaws: An array of relevant laws or legal principles (e.g., ["Breach of Contract", "Negligence"]).
    - jurisdiction: The likely jurisdiction where the case would be heard.
    - recommendations: An array of recommendations for the user (e.g., ["Consult with an attorney", "Gather evidence"]).
    - deadlines: An array of important deadlines to consider.
    - strengthIndicators: A brief assessment of the strengths of the case.
    - supportingDocumentation: An array of recommended supporting documents (e.g., ["Contracts", "Medical Records"]).
    - draftedCommunication: A draft of a communication to the opposing party.

    Case Description: ${issueDescription}

    Ensure the response is a valid JSON object. If any field cannot be determined, set its value to null.
    `

    const payload = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!geminiResponse.ok) {
      console.error(
        'Gemini API Error:',
        geminiResponse.status,
        geminiResponse.statusText
      )
      const errorData = await geminiResponse.json()
      console.error('Gemini API Error Details:', errorData)
      throw new Error(
        `Failed to generate content from Gemini API: ${geminiResponse.statusText}`
      )
    }

    const data = await geminiResponse.json()

    if (
      !data.candidates ||
      data.candidates.length === 0 ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      data.candidates[0].content.parts.length === 0
    ) {
      throw new Error('No content returned from Gemini API.')
    }

    const analysisText = data.candidates[0].content.parts[0].text

    let analysis: AnalysisResult

    try {
      analysis = JSON.parse(analysisText) as AnalysisResult
    } catch (error) {
      console.error('Failed to parse Gemini response:', error)
      console.error('Raw response from Gemini:', analysisText)
      throw new Error('Failed to parse analysis from Gemini API response.')
    }

    return NextResponse.json({ analysis })
  } catch (error: any) {
    console.error('Error during analysis:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to analyze case.' },
      { status: 500 }
    )
  }
}
