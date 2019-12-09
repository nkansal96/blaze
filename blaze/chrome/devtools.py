""" This module implements methods interacting with Chrome DevTools """
import json
import os
import subprocess
import sys
import tempfile
from typing import Optional

from blaze.action.policy import Policy
from blaze.config.client import ClientEnvironment
from blaze.config.config import Config
from blaze.logger import logger
from blaze.mahimahi import MahiMahiConfig

from .har import har_from_json, Har


def capture_har_in_replay_server(
    url: str,
    config: Config,
    client_env: ClientEnvironment,
    policy: Optional[Policy] = None,
    cache_time: Optional[int] = None,
    user_data_dir: Optional[str] = None,
    extract_critical_requests: Optional[bool] = False,
) -> Har:
    """
    capture_har spawns a headless chrome instance and connects to its remote debugger
    in order to extract the HAR file generated by loading the given URL. The har capturer
    is launched inside a replay shell using the specified Mahimahi config, which means
    that the webpage needs to have been recorded before calling this method
    """
    log = logger.with_namespace("capture_har_in_replay_server")

    if not config.env_config or not config.env_config.replay_dir:
        raise ValueError("replay_dir must be specified")

    policy = policy or Policy.from_dict({})
    mahimahi_config = MahiMahiConfig(config=config, policy=policy, client_environment=client_env)

    with tempfile.TemporaryDirectory() as temp_dir:
        policy_file = os.path.join(temp_dir, "policy.json")
        output_file = os.path.join(temp_dir, "har.json")
        trace_file = os.path.join(temp_dir, "trace_file")

        with open(policy_file, "w") as f:
            log.debug("writing push policy file", policy_file=policy_file)
            f.write(json.dumps(policy.as_dict))
        with open(trace_file, "w") as f:
            log.debug("writing trace file", trace_file=trace_file)
            f.write(mahimahi_config.formatted_trace_file)

        # configure the HAR capturer
        cmd = mahimahi_config.har_capture_cmd(
            share_dir=temp_dir,
            har_output_file_name="har.json",
            policy_file_name="policy.json",
            link_trace_file_name="trace_file",
            capture_url=url,
            cache_time=cache_time,
            user_data_dir=user_data_dir,
            extract_critical_requests=extract_critical_requests,
        )

        # spawn the HAR capturer process
        log.debug("spawning har capturer", url=url, cmd=cmd)
        har_capture_proc = subprocess.run(cmd, stdout=sys.stderr, stderr=sys.stderr, timeout=300)
        har_capture_proc.check_returncode()

        with open(output_file, "r") as f:
            return har_from_json(f.read())


def capture_si_in_replay_server(
    url: str,
    config: Config,
    client_env: ClientEnvironment,
    policy: Optional[Policy] = None,
    cache_time: Optional[int] = None,
    user_data_dir: Optional[str] = None,
    extract_critical_requests: Optional[bool] = False,
) -> float:
    """
    capture_har spawns a headless chrome instance and connects to its remote debugger
    in order to extract the HAR file generated by loading the given URL. The har capturer
    is launched inside a replay shell using the specified Mahimahi config, which means
    that the webpage needs to have been recorded before calling this method
    """
    log = logger.with_namespace("capture_si_in_replay_server")

    if not config.env_config or not config.env_config.replay_dir:
        raise ValueError("replay_dir must be specified")

    policy = policy or Policy.from_dict({})
    mahimahi_config = MahiMahiConfig(config=config, policy=policy, client_environment=client_env)

    with tempfile.TemporaryDirectory() as temp_dir:
        policy_file = os.path.join(temp_dir, "policy.json")
        output_file = os.path.join(temp_dir, "si.json")
        trace_file = os.path.join(temp_dir, "trace_file")

        with open(policy_file, "w") as f:
            log.debug("writing push policy file", policy_file=policy_file)
            f.write(json.dumps(policy.as_dict))
        with open(trace_file, "w") as f:
            log.debug("writing trace file", trace_file=trace_file)
            f.write(mahimahi_config.formatted_trace_file)

        # configure the SI (speed index) capturer
        cmd = mahimahi_config.si_capture_cmd(
            share_dir=temp_dir,
            si_output_file_name="si.json",
            policy_file_name="policy.json",
            link_trace_file_name="trace_file",
            capture_url=url,
            cache_time=cache_time,
            user_data_dir=user_data_dir,
            extract_critical_requests=extract_critical_requests,
        )

        # spawn the SI capturer process
        log.debug("spawning SI capturer", url=url, cmd=cmd)
        si_capture_proc = subprocess.run(cmd, stdout=sys.stderr, stderr=sys.stderr)
        si_capture_proc.check_returncode()

        with open(output_file, "r") as f:
            return float(f.read())
