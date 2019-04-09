""" This module implements some preprocessing functions for HAR files """
from typing import List

from blaze.config.environment import Resource, ResourceType
from blaze.util.seq import ordered_uniq

def get_har_entry_type(entry) -> ResourceType:
  """ Returns the ResourceType for the given HAR Entry """
  mime_str = entry.response.content.mimeType
  mime_map = [
    (['css'],
     ResourceType.CSS),
    (['html'],
     ResourceType.HTML),
    (['javascript'],
     ResourceType.SCRIPT),
    (['image'],
     ResourceType.IMAGE),
    (['font'],
     ResourceType.FONT),
  ]

  for (mime_types, resource_type) in mime_map:
    if any(mime_type in mime_str for mime_type in mime_types):
      return resource_type
  return ResourceType.OTHER

def har_entries_to_resources(har_entries) -> List[Resource]:
  """ Converts a list of HAR entries to a list of Resources """
  # sort the requests by initiated time
  har_entries = sorted(har_entries, key=lambda e: e.startedDateTime)
  har_entries = ordered_uniq(har_entries, key=lambda e: e.request.url)

  resource_list = []
  for (order, entry) in enumerate(har_entries):
    resource_list.append(Resource(
      url=entry.request.url,
      size=entry.response.bodySize + entry.response.headersSize,
      order=order,
      group_id=0,
      source_id=order,
      type=get_har_entry_type(entry)
    ))

  return resource_list