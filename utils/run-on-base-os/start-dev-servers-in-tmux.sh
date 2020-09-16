#!/bin/bash

# Scenario 1: If you do not have tmux
# cd ptclient; yarn start-dev
# cd ptserver; yarn start-dev

# Scenario 2: If you have tmux but not tmuxinator:
# With the following tmux command the panel will exit when program ends
# tmux new-session -s projectname 'yarn docs-in-dev-mode' \; split-window 'cd ptclient; yarn start-dev' \; split-window \; select-layout tiled \;

# Scenario 3: If you have tmuxinator. Used by core devs
# Here panes do not exit when command ends
tmuxinator start all-dev-servers-in-tmux

# If you dont have yarn
# 1. cd ptclient; npm run start-dev
