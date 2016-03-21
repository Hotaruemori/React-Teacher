import { expect } from 'chai';
import saveMember from '../saveMember';
import MemberEntity from '../../api/memberEntity';
import memberAPI from '../../api/memberAPI';
import MemberErrors from '../../validations/memberFormErrors'
import MemberFormValidator from '../../validations/memberFormValidator';


describe('saveMember', () => {
  it('should return an action equals { type: "MEMBER_SAVE", errors { isEntityValid: true } } and calls to ' +
    'validateMember and saveAuthor methods when passing valid member', () => {
      // Arrange
      let member = new MemberEntity();
      let mockedValidationError = new MemberErrors();
      mockedValidationError.isEntityValid = true;

      let validateMemberMethodStub = sinon.stub(MemberFormValidator, 'validateMember');
      validateMemberMethodStub.returns(mockedValidationError);

      let saveAuthorMethodStub = sinon.stub(memberAPI, 'saveAuthor');

      // Act
      let result = saveMember(member);

      // Assert
      expect(result.type).to.be.equal('MEMBER_SAVE');
      expect(result.errors.isEntityValid).to.be.true;
      expect(validateMemberMethodStub.called).to.be.true;
      expect(saveAuthorMethodStub.called).to.be.true;
      expect(saveAuthorMethodStub.calledWith(member)).to.be.true;

      // Tear down spies
      // We could place this in afterEach but we don't want to
      // force all test to mock this
      validateMemberMethodStub.restore();
      saveAuthorMethodStub.restore();
  });

  it('should return an action equals { type: "MEMBER_SAVE", errors { isEntityValid: false } } and calls to ' +
    'validateMember method when passing invalid member', () => {
      // Arrange
      let member = new MemberEntity();
      let mockedValidationError = new MemberErrors();
      mockedValidationError.isEntityValid = false;

      let validateMemberMethodStub = sinon.stub(MemberFormValidator, 'validateMember');
      validateMemberMethodStub.returns(mockedValidationError);

      let saveAuthorMethodStub = sinon.stub(memberAPI, 'saveAuthor');

      // Act
      let result = saveMember(member);

      // Assert
      expect(result.type).to.be.equal('MEMBER_SAVE');
      expect(result.errors.isEntityValid).to.be.false;
      expect(validateMemberMethodStub.called).to.be.true;
      expect(saveAuthorMethodStub.called).to.be.false;
      expect(saveAuthorMethodStub.calledWith(member)).to.be.false;

      // Tear down spies
      // We could place this in afterEach but we don't want to
      // force all test to mock this
      validateMemberMethodStub.restore();
      saveAuthorMethodStub.restore();
  });
});
