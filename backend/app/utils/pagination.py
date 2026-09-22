from typing import Tuple


def get_pagination(
    page: int = 1,
    page_size: int = 10,
) -> Tuple[int, int]:
    if page < 1:
        page = 1

    if page_size < 1:
        page_size = 10

    if page_size > 100:
        page_size = 100

    skip = (page - 1) * page_size

    return skip, page_size