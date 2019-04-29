import { Equals } from './equals';
import { NotEquals } from './not-equals';
import { Deserializer } from '../lib/deserializer';
import { BaseCondition } from './base';
import { Always } from './always';
import { Never } from './never';
import { Greater } from './greater';
import { GreaterOrEquals } from './greater-or-equals';
import { Lesser } from './lesser';
import { LesserOrEquals } from './lesser-or-equals';
import { IncludedIn } from './included-in';
import { ExcludedIn } from './excluded-in';

class ConditionDeserializer extends Deserializer<BaseCondition> {
  protected deserializers = [
    Equals,
    NotEquals,
    Always,
    Never,
    Greater,
    GreaterOrEquals,
    Lesser,
    LesserOrEquals,
    IncludedIn,
    ExcludedIn
  ];
}

export const conditionDeserializer = new ConditionDeserializer();
