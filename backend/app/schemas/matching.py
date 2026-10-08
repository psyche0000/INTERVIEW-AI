"""
Pydantic schemas for Resume ? Job Matching APIs.

These schemas define the contract for the Matching Foundation.
Actual matching/scoring logic will be provided by the matching service
or a future matching/AI engine.
"""

from uuid import UUID

from pydantic import BaseModel, Field


class MatchRequest(BaseModel):
    """Request to evaluate a Resume against a Job."""

    resume_id: UUID = Field(
        ...,
        description="Identifier of the resume to evaluate.",
    )

    job_id: UUID = Field(
        ...,
        description="Identifier of the job to evaluate against.",
    )


class SkillGapResult(BaseModel):
    """Skill-gap information produced by the matching layer."""

    matched_skills: list[str] = Field(
        default_factory=list,
        description="Skills shared by the resume and the job.",
    )

    missing_skills: list[str] = Field(
        default_factory=list,
        description="Job-required skills not currently matched by the resume.",
    )


class RecommendationResult(BaseModel):
    """Recommendation produced from matching and skill-gap information."""

    recommendations: list[str] = Field(
        default_factory=list,
        description="Recommendations for improving the resume/job match.",
    )


class MatchResult(BaseModel):
    """Structured result returned by the Matching Foundation."""

    resume_id: UUID = Field(
        ...,
        description="Identifier of the evaluated resume.",
    )

    job_id: UUID = Field(
        ...,
        description="Identifier of the evaluated job.",
    )

    match_score: float | None = Field(
        default=None,
        ge=0,
        le=100,
        description="Optional match score from a future matching engine.",
    )

    skill_gap: SkillGapResult = Field(
        default_factory=SkillGapResult,
        description="Skill comparison between the resume and job.",
    )

    recommendations: RecommendationResult = Field(
        default_factory=RecommendationResult,
        description="Recommendations derived from the matching result.",
    )
