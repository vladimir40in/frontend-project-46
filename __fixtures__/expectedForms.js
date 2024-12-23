export const expectedPlainOutput = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

export const expectedYamlOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

export const expectedJsonOutput = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

export const expectedJsonFormatOutput = `[
  {
    "key": "common",
    "type": "PARENT",
    "children": [
      {
        "key": "follow",
        "type": "ADDED",
        "value": false
      },
      {
        "key": "setting1",
        "oldValue": "Value 1",
        "type": "UNCHANGED"
      },
      {
        "key": "setting2",
        "oldValue": 200,
        "type": "DELETED"
      },
      {
        "key": "setting3",
        "type": "CHANGED",
        "oldValue": true,
        "value": null
      },
      {
        "key": "setting4",
        "type": "ADDED",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "ADDED",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "type": "PARENT",
        "children": [
          {
            "key": "doge",
            "type": "PARENT",
            "children": [
              {
                "key": "wow",
                "type": "CHANGED",
                "oldValue": "",
                "value": "so much"
              }
            ]
          },
          {
            "key": "key",
            "oldValue": "value",
            "type": "UNCHANGED"
          },
          {
            "key": "ops",
            "type": "ADDED",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "type": "PARENT",
    "children": [
      {
        "key": "baz",
        "type": "CHANGED",
        "oldValue": "bas",
        "value": "bars"
      },
      {
        "key": "foo",
        "oldValue": "bar",
        "type": "UNCHANGED"
      },
      {
        "key": "nest",
        "type": "CHANGED",
        "oldValue": {
          "key": "value"
        },
        "value": "str"
      }
    ]
  },
  {
    "key": "group2",
    "oldValue": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    },
    "type": "DELETED"
  },
  {
    "key": "group3",
    "type": "ADDED",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;
