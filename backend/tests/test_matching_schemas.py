from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.schemas.matching import (
    MatchRequest,
    MatchResult,
    RecommendationResult,
    SkillGapResult,
)


def test_match_request_accepts_valid_ids():
    resume_id = uuid4()
    job_id = uuid4()

    request = MatchRequest(
        resume_id=resume_id,
        job_id=job_id,
    )

    assert request.resume_id == resume_id
    assert request.job_id == job_id


def test_match_request_requires_resume_id():
    with pytest.raises(ValidationError):
        MatchRequest(
            job_id=uuid4(),
        )


def test_match_request_requires_job_id():
    with pytest.raises(ValidationError):
        MatchRequest(
            resume_id=uuid4(),
        )


def test_skill_gap_defaults_to_empty_lists():
    result = SkillGapResult()

    assert result.matched_skills == []
    assert result.missing_skills == []


def test_recommendation_defaults_to_empty_list():
    result = RecommendationResult()

    assert result.recommendations == []


def test_match_result_accepts_optional_score():
    resume_id = uuid4()
    job_id = uuid4()

    result = MatchResult(
        resume_id=resume_id,
        job_id=job_id,
        match_score=None,
    )

    assert result.resume_id == resume_id
    assert result.job_id == job_id
    assert result.match_score is None


def test_match_result_rejects_score_above_100():
    with pytest.raises(ValidationError):
        MatchResult(
            resume_id=uuid4(),
            job_id=uuid4(),
            match_score=101,
        )


def test_match_result_rejects_negative_score():
    with pytest.raises(ValidationError):
        MatchResult(
            resume_id=uuid4(),
            job_id=uuid4(),
            match_score=-1,
        )
