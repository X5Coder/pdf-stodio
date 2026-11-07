"""
Image Search Tool - Fetch images from the web for PDF Studio pages
Based on X5Agent image_search but simplified for standalone use

Features:
- Search multiple free sources (Unsplash, Pexels, Pixabay, Openverse)
- Auto-detect photo vs icon based on query
- Download and validate images
- Save to specified project page folder
"""

import urllib.request
import urllib.parse
import json
import os
from typing import List, Dict, Optional

class ImageSearch:
    def __init__(self, target_dir: str):
        """
        Initialize image search with target directory

        Args:
            target_dir: Path to save downloaded images (e.g., projects/myproject/page01/images)
        """
        self.target_dir = target_dir
        os.makedirs(target_dir, exist_ok=True)

        self.user_agent = (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        )

        # Icon detection keywords
        self.icon_keywords = ["icon", "icons", "svg", "logo", "logos"]

    def search(self, query: str, count: int = 3, kind: str = "auto") -> List[Dict]:
        """
        Search for images online

        Args:
            query: Search query (e.g., "business meeting", "chart icon")
            count: Number of images to fetch (1-10)
            kind: "auto", "photo", or "icon"

        Returns:
            List of image metadata: [{path, url, source, width, height}, ...]
        """
        # Auto-detect kind
        if kind == "auto":
            kind = "icon" if any(kw in query.lower() for kw in self.icon_keywords) else "photo"

        # Try different sources in order
        sources = []
        if kind == "photo":
            sources = [
                self._search_unsplash,
                self._search_pexels,
                self._search_pixabay,
                self._search_openverse
            ]
        else:  # icon
            sources = [
                self._search_iconify,
                self._search_openverse
            ]

        results = []
        for source_func in sources:
            if len(results) >= count:
                break
            try:
                new_results = source_func(query, count - len(results))
                for img in new_results:
                    saved_path = self._download_image(img["url"])
                    if saved_path:
                        results.append({
                            "path": saved_path,
                            "url": img["url"],
                            "source": img["source"],
                            "width": img.get("width"),
                            "height": img.get("height")
                        })
            except Exception as e:
                print(f"Error with {source_func.__name__}: {e}")
                continue

        return results

    def _download_image(self, url: str) -> Optional[str]:
        """Download image from URL and save to target directory"""
        try:
            req = urllib.request.Request(url, headers={"User-Agent": self.user_agent})
            with urllib.request.urlopen(req, timeout=15) as response:
                data = response.read()

            # Generate filename
            ext = self._get_extension(url, response.headers.get("Content-Type", ""))
            filename = f"img_{len(os.listdir(self.target_dir)) + 1}{ext}"
            filepath = os.path.join(self.target_dir, filename)

            with open(filepath, "wb") as f:
                f.write(data)

            return filepath
        except Exception as e:
            print(f"Download failed for {url}: {e}")
            return None

    def _get_extension(self, url: str, content_type: str) -> str:
        """Determine file extension from URL or content type"""
        if url.endswith((".jpg", ".jpeg", ".png", ".webp", ".svg")):
            return url[url.rfind("."):]
        if "jpeg" in content_type:
            return ".jpg"
        if "png" in content_type:
            return ".png"
        if "webp" in content_type:
            return ".webp"
        if "svg" in content_type:
            return ".svg"
        return ".jpg"  # default

    def _search_unsplash(self, query: str, count: int) -> List[Dict]:
        """Search Unsplash (requires API key - using placeholder)"""
        # This is a placeholder - real implementation needs API key
        print("Unsplash search requires API key")
        return []

    def _search_pexels(self, query: str, count: int) -> List[Dict]:
        """Search Pexels (requires API key - using placeholder)"""
        # This is a placeholder - real implementation needs API key
        print("Pexels search requires API key")
        return []

    def _search_pixabay(self, query: str, count: int) -> List[Dict]:
        """Search Pixabay (requires API key - using placeholder)"""
        # This is a placeholder - real implementation needs API key
        print("Pixabay search requires API key")
        return []

    def _search_openverse(self, query: str, count: int) -> List[Dict]:
        """Search Openverse (CC-licensed images, no API key needed)"""
        try:
            encoded_query = urllib.parse.quote(query)
            url = f"https://api.openverse.org/v1/images/?q={encoded_query}&page_size={count}"
            req = urllib.request.Request(url, headers={"User-Agent": self.user_agent})

            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read())

            results = []
            for item in data.get("results", []):
                results.append({
                    "url": item["url"],
                    "source": "Openverse",
                    "width": item.get("width"),
                    "height": item.get("height")
                })

            return results
        except Exception as e:
            print(f"Openverse search error: {e}")
            return []

    def _search_iconify(self, query: str, count: int) -> List[Dict]:
        """Search Iconify for SVG icons"""
        try:
            encoded_query = urllib.parse.quote(query)
            url = f"https://api.iconify.design/search?query={encoded_query}&limit={count}"
            req = urllib.request.Request(url, headers={"User-Agent": self.user_agent})

            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read())

            results = []
            for item in data.get("icons", [])[:count]:
                # Construct SVG URL
                svg_url = f"https://api.iconify.design/{item['provider']}:{item['name']}.svg"
                results.append({
                    "url": svg_url,
                    "source": "Iconify",
                    "width": 24,
                    "height": 24
                })

            return results
        except Exception as e:
            print(f"Iconify search error: {e}")
            return []


# CLI usage example
if __name__ == "__main__":
    import sys

    if len(sys.argv) < 3:
        print("Usage: python imageSearch.py <query> <target_dir> [count]")
        sys.exit(1)

    query = sys.argv[1]
    target_dir = sys.argv[2]
    count = int(sys.argv[3]) if len(sys.argv) > 3 else 3

    searcher = ImageSearch(target_dir)
    results = searcher.search(query, count)

    print(f"Found {len(results)} images:")
    for img in results:
        print(f"  - {img['path']} (from {img['source']})")
