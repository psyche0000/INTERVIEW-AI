"""
API routes for Resume ? Job Matching.

These endpoints expose the Matching Foundation. Actual matching,
skill-gap analysis, and recommendation logic can be connected
to the service layer later.
"""

from uuid import UUID

from fastapi import APIRouter

from app.schemas.matching import (
    MatchRequest,
    MatchResult,
    RecommendationResult,
    SkillGapResult,
)
from app.services.matching_service import MatchingService


router = APIRouter(
    prefix="/api/v1/matching",
    tags=["Matching"],
)

matching_service = MatchingService()


@router.post(
    "",
    response_model=MatchResult,
)
async def match_resume_to_job(
    request: MatchRequest,
) -> MatchResult:
    """Evaluate a Resume against a Job."""

    return await matching_service.match_resume_to_job(request)


@router.get(
    "/skill-gap/{resume_id}/{job_id}",
    response_model=SkillGapResult,
)
async def get_skill_gap(
    resume_id: UUID,
    job_id: UUID,
) -> SkillGapResult:
    """Return skill-gap information for a Resume and Job."""

    return await matching_service.get_skill_gap(
        resume_id,
        job_id,
    )


@router.get(
    "/recommendations/{resume_id}/{job_id}",
    response_model=RecommendationResult,
)
async def get_recommendations(
    resume_id: UUID,
    job_id: UUID,
) -> RecommendationResult:
    """Return recommendations for a Resume and Job."""

    return await matching_service.get_recommendations(
        resume_id,
        job_id,
    )
