import asyncio
from uuid import uuid4

from app.schemas.matching import MatchRequest
from app.services.matching_service import MatchingService


def test_match_resume_to_job_returns_structured_result():
    async def run_test():
        service = MatchingService()

        resume_id = uuid4()
        job_id = uuid4()

        result = await service.match_resume_to_job(
            MatchRequest(
                resume_id=resume_id,
                job_id=job_id,
            )
        )

        assert result.resume_id == resume_id
        assert result.job_id == job_id
        assert result.match_score is None
        assert result.skill_gap.matched_skills == []
        assert result.skill_gap.missing_skills == []
        assert result.recommendations.recommendations == []

    asyncio.run(run_test())


def test_get_skill_gap_returns_empty_structure():
    async def run_test():
        service = MatchingService()

        result = await service.get_skill_gap(
            uuid4(),
            uuid4(),
        )

        assert result.matched_skills == []
        assert result.missing_skills == []

    asyncio.run(run_test())


def test_get_recommendations_returns_empty_structure():
    async def run_test():
        service = MatchingService()

        result = await service.get_recommendations(
            uuid4(),
            uuid4(),
        )

        assert result.recommendations == []

    asyncio.run(run_test())
