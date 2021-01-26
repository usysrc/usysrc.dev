#!/bin/bash

sed '/content/{
    s/content//g
    r index_raw.html
}' template.html