"""
Matching Service
================

Business-logic foundation for Resume ? Job matching.

The service defines the matching workflow and API contract without
introducing a specific AI/ML implementation. A future matching engine
can be connected here.
"""

from uuid import UUID

from app.schemas.matching import (
    MatchRequest,
    MatchResult,
    RecommendationResult,
    SkillGapResult,
)


class MatchingService:
    """Service layer for Resume ? Job matching."""

    async def match_resume_to_job(
        self,
        request: MatchRequest,
    ) -> MatchResult:
        """
        Evaluate a Resume against a Job.

        Actual matching/scoring logic will be provided by a future
        matching engine. The foundation currently returns a structured
        result with no calculated score.
        """

        return MatchResult(
            resume_id=request.resume_id,
            job_id=request.job_id,
            match_score=None,
            skill_gap=SkillGapResult(),
            recommendations=RecommendationResult(),
        )

    async def get_skill_gap(
        self,
        resume_id: UUID,
        job_id: UUID,
    ) -> SkillGapResult:
        """Return the skill-gap structure for a Resume and Job."""

        return SkillGapResult()

    async def get_recommendations(
        self,
        resume_id: UUID,
        job_id: UUID,
    ) -> RecommendationResult:
        """Return recommendation structure for a Resume and Job."""

        return RecommendationResult()
